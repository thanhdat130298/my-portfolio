export interface GeminiGenerateOptions {
  apiKey: string
  /** Used when every model on the primary key hits quota / rate limits. */
  apiKeyBackup?: string
  models: string[]
  systemInstruction?: string
  userText: string
  temperature?: number
  maxOutputTokens?: number
  /** Set 0 to disable thinking tokens that steal the reply budget. */
  thinkingBudget?: number
}

export interface GeminiGenerateResult {
  text: string
  model: string
  keySlot: 'primary' | 'backup'
}

export interface GeminiErrorPayload {
  error?: {
    code?: number
    message?: string
    status?: string
  }
}

/**
 * Top free-tier headroom (approx RPD / RPM) among text models available
 * on this project — ordered highest-quota / healthiest first.
 * Quotas are per model id; round-robin spreads load across buckets.
 *
 * Typical free-tier ballpark (varies by project — check AI Studio):
 * - gemini-3.1-flash-lite(+preview): ~15 RPM, ~1k–1.5k RPD
 * - gemma-4-*: ~15 RPM, ~1.5k RPD
 * - gemini-2.0-flash(+lite/+001): ~15 RPM, ~1.5k RPD (often exhausted first)
 * - gemini-3-flash-preview / gemini-flash-latest: ~10 RPM, ~1.5k RPD
 */
export const DEFAULT_GEMINI_MODELS = [
  'gemini-3.1-flash-lite',
  'gemini-3.1-flash-lite-preview',
  'gemma-4-26b-a4b-it',
  'gemma-4-31b-it',
  'gemini-2.0-flash-lite',
  'gemini-2.0-flash-lite-001',
  'gemini-2.0-flash',
  'gemini-2.0-flash-001',
  'gemini-3-flash-preview',
  'gemini-flash-latest',
] as const

export const MAX_GEMINI_MODELS = 10

/** Round-robin start index so traffic is spread across models. */
let roundRobinIndex = 0

export function parseGeminiModels(raw?: string, fallbackModel?: string): string[] {
  const fromList = (raw || '')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean)

  if (fromList.length) {
    return [...new Set(fromList)].slice(0, MAX_GEMINI_MODELS)
  }

  if (fallbackModel?.trim()) {
    return [fallbackModel.trim()]
  }

  return [...DEFAULT_GEMINI_MODELS]
}

function isGemmaModel(model: string) {
  return model.toLowerCase().startsWith('gemma-')
}

const META_LINE =
  /^(?:\*+\s*)?(?:User Name|Subject|Question|Role|Name|Location|Specialization|Summary|Education|Language|OUTPUT RULES|KNOWLEDGE BASE|Check length|\*?Wait|\*?Draft|Rule \d|Final answer|Final Answer|Response|Plan|Thinking|Scratchpad|Notes|Wittier|The user wants)/i

/** Detect planning / checklist dumps that must never reach the UI. */
export function looksLikeScratchpad(text: string) {
  const t = text.trim()
  if (!t) return false

  const signals = [
    /User Name\s*:/i,
    /Subject\s*:/i,
    /\*?Draft\s*\d/i,
    /Rule\s*\d\s*:/i,
    /\(Check\s*:/i,
    /\*?Wait,? let's/i,
    /Check length/i,
    /scratchpad/i,
    /Final Answer\s*:/i,
    /Wittier/i,
    /OUTPUT RULES/i,
    /The user wants me to/i,
    /However,\s+the request/i,
    /so it's not ["']?off-topic/i,
    /which would require/i,
  ].filter(re => re.test(t)).length

  if (signals >= 2) return true
  if (/User Name\s*:[\s\S]{0,200}Subject\s*:/i.test(t)) return true
  if (/However,\s+the request[\s\S]{0,80}off-topic/i.test(t)) return true
  // Long English bullet planning before a short answer
  if (t.length > 500 && (t.match(/\*\s+/g)?.length || 0) >= 6) return true
  return false
}

function hasVietnamese(text: string) {
  return /[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđĐ]/i.test(text)
}

function lightClean(text: string) {
  return text
    .replace(/^\*+\s*/, '')
    .replace(/^["'«]|["'»]$/g, '')
    .replace(/\bPerfect\.?\s*(?=[A-ZÀ-ỹ])/g, '')
    .replace(/^\[[^\]]{0,40}\]\s*/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function extractQuotedChunks(text: string) {
  return [...text.matchAll(/"([^"]{30,450})"/g)]
    .map(m => lightClean(m[1] || ''))
    .filter(Boolean)
}

function extractDraftChunks(text: string) {
  return [...text.matchAll(/\*?\s*Draft[^*:\n]*:\*?\s*([^*\n]{30,450})/gi)]
    .map(m => lightClean(m[1] || ''))
    .filter(Boolean)
}

function isCompleteSentence(text: string) {
  return /[.!?…]"?$/.test(text.trim())
}

function pickBestCandidate(candidates: string[]) {
  const unique = [...new Set(candidates.map(lightClean).filter(c => c.length >= 30 && c.length <= 480))]
  if (!unique.length) return ''

  const complete = unique.filter(isCompleteSentence)
  const pool = complete.length ? complete : unique

  // Prefer Vietnamese answers when present; otherwise last candidate.
  const vi = pool.filter(hasVietnamese)
  const ranked = vi.length ? vi : pool
  return ranked[ranked.length - 1] || ''
}

/**
 * Strip model scratchpad / planning leaks.
 * If the model dumped drafts + rule checks, keep only the final answer prose.
 */
export function sanitizeChatReply(text: string) {
  const raw = text.trim()
  if (!raw) return ''

  if (!looksLikeScratchpad(raw) && raw.length < 700) {
    const lines = raw
      .split(/\n+/)
      .map(l => l.trim())
      .filter(Boolean)
      .filter(l => !META_LINE.test(l) && !/check length|scratchpad/i.test(l))
    return lightClean(lines.join(' ') || raw)
  }

  const candidates = [
    ...extractQuotedChunks(raw),
    ...extractDraftChunks(raw),
  ]

  // Keep prose lines that look like real answers (not labeled planning).
  for (const line of raw.split(/\n+/)) {
    const trimmed = line.replace(/^\*+\s*/, '').trim()
    if (!trimmed || trimmed.length < 40) continue
    if (META_LINE.test(trimmed)) continue
    if (/^(?:Check|Only use KB|Out of bounds)/i.test(trimmed)) continue
    if (/Rule\s*\d|^\(Check/i.test(trimmed)) continue
    if (hasVietnamese(trimmed) || (!/[A-Za-z]{3,}\s*:/.test(trimmed) && trimmed.split(/\s+/).length >= 8)) {
      candidates.push(lightClean(trimmed))
    }
  }

  const best = pickBestCandidate(candidates)
  if (best) return best

  // Last resort: take trailing Vietnamese sentences if any.
  const viMatch = raw.match(/((?:[^.!?…]*[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđĐ][^.!?…]*[.!?…]){1,3})\s*$/i)
  if (viMatch?.[1]) return lightClean(viMatch[1])

  return ''
}

function normalizeModelText(_model: string, text: string) {
  return sanitizeChatReply(text.trim())
}

export function isUsableChatReply(text: string) {
  const t = text.trim()
  if (t.length < 2) return false
  if (looksLikeScratchpad(t)) return false
  if (/User Name\s*:|Subject\s*:|\*?Draft\s*\d|Rule\s*\d\s*:/i.test(t)) return false
  return true
}

function extractStatusCode(error: unknown): number | undefined {
  if (!error || typeof error !== 'object') return undefined
  const e = error as {
    statusCode?: number
    status?: number
    data?: GeminiErrorPayload
    response?: { status?: number }
  }
  return (
    e.statusCode
    || e.status
    || e.response?.status
    || e.data?.error?.code
  )
}

function extractErrorMessage(error: unknown): string {
  if (!error || typeof error !== 'object') return String(error)
  const e = error as { data?: GeminiErrorPayload | string; message?: string }
  if (typeof e.data === 'object' && e.data?.error?.message) {
    return e.data.error.message
  }
  if (typeof e.data === 'string') return e.data
  if (e.message) return e.message
  return 'Gemini request failed'
}

/** Retry when rate-limited, overloaded, or model unavailable. */
export function shouldTryNextModel(error: unknown): boolean {
  const code = extractStatusCode(error)
  if (code === 429 || code === 503 || code === 404) return true

  const message = extractErrorMessage(error).toLowerCase()
  return (
    message.includes('resource_exhausted')
    || message.includes('quota')
    || message.includes('rate')
    || message.includes('high demand')
    || message.includes('unavailable')
    || message.includes('not found')
    || message.includes('no longer available')
  )
}

/** True when the key/project is out of quota (worth switching API key). */
export function isQuotaExhaustedError(error: unknown): boolean {
  const code = extractStatusCode(error)
  if (code === 429) return true

  const message = extractErrorMessage(error).toLowerCase()
  return (
    message.includes('resource_exhausted')
    || message.includes('quota')
    || message.includes('rate limit')
    || message.includes('rate-limit')
  )
}

function orderedModels(models: string[]): string[] {
  if (!models.length) return [...DEFAULT_GEMINI_MODELS]
  const start = roundRobinIndex % models.length
  roundRobinIndex = (roundRobinIndex + 1) % models.length
  return [...models.slice(start), ...models.slice(0, start)]
}

function buildRequestBody(
  options: GeminiGenerateOptions,
  model: string,
  withThinkingConfig: boolean,
) {
  const gemma = isGemmaModel(model)
  const generationConfig: Record<string, unknown> = {
    temperature: options.temperature ?? 0.3,
    maxOutputTokens: options.maxOutputTokens ?? 512,
  }

  if (withThinkingConfig && !gemma) {
    generationConfig.thinkingConfig = {
      thinkingBudget: options.thinkingBudget ?? 0,
    }
  }

  let userText = options.userText
  if (gemma && options.systemInstruction) {
    userText = `${options.systemInstruction}

---
Câu hỏi của user:
${options.userText}

OUTPUT RULES (bắt buộc):
- Chỉ viết nội dung trả lời cho user.
- Không viết Check length / Plan / Thinking / Perfect / scratchpad.
- Không đưa option/menu để user chọn — tự trả lời thẳng, tối giản.
- Không nhắc lại các quy tắc trên.`
  }

  const body: Record<string, unknown> = {
    contents: [
      {
        role: 'user',
        parts: [{ text: userText }],
      },
    ],
    generationConfig,
  }

  if (!gemma && options.systemInstruction) {
    body.systemInstruction = {
      parts: [{ text: options.systemInstruction }],
    }
  }

  return body
}

async function callGeminiModel(
  url: string,
  model: string,
  options: GeminiGenerateOptions,
) {
  const attempt = async (withThinkingConfig: boolean) => {
    return await $fetch<{
      candidates?: Array<{
        content?: { parts?: Array<{ text?: string }> }
        finishReason?: string
      }>
      error?: { message?: string; code?: number; status?: string }
    }>(url, {
      method: 'POST',
      body: buildRequestBody(options, model, withThinkingConfig),
    })
  }

  if (isGemmaModel(model)) {
    return await attempt(false)
  }

  try {
    return await attempt(true)
  }
  catch {
    // Older Flash models may reject thinkingConfig — retry plain config.
    return await attempt(false)
  }
}

async function generateWithSingleKey(
  options: GeminiGenerateOptions,
  apiKey: string,
  keySlot: 'primary' | 'backup',
): Promise<GeminiGenerateResult> {
  const models = orderedModels(options.models)
  let lastError: unknown
  let quotaHits = 0

  for (let i = 0; i < models.length; i++) {
    const model = models[i]!
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`

    try {
      const data = await callGeminiModel(url, model, { ...options, apiKey })

      if (data.error?.message) {
        const synthetic = {
          statusCode: data.error.code || 502,
          data: { error: data.error },
        }
        if (isQuotaExhaustedError(synthetic)) quotaHits++
        if (shouldTryNextModel(synthetic) && i < models.length - 1) {
          lastError = synthetic
          continue
        }
        throw createError({
          statusCode: isQuotaExhaustedError(synthetic) ? 429 : 502,
          statusMessage: 'Assistant is temporarily unavailable. Please try again.',
          data: { quotaExhausted: isQuotaExhaustedError(synthetic) },
        })
      }

      const candidate = data.candidates?.[0]
      const raw =
        candidate?.content?.parts?.map(p => p.text || '').join('').trim() || ''
      const text = normalizeModelText(model, raw)

      if (candidate?.finishReason === 'MAX_TOKENS' && text.length < 80 && i < models.length - 1) {
        lastError = { statusCode: 503, data: { error: { message: 'truncated reply' } } }
        continue
      }

      if (!text || !isUsableChatReply(text)) {
        lastError = { statusCode: 503, data: { error: { message: 'unusable reply' } } }
        if (i < models.length - 1) continue
        // Don't return empty as success — fall through to throw below.
        break
      }

      return { text, model, keySlot }
    }
    catch (error: unknown) {
      lastError = error
      if (isQuotaExhaustedError(error)) quotaHits++
      if (shouldTryNextModel(error) && i < models.length - 1) continue
      break
    }
  }

  const quotaExhausted = quotaHits > 0 || isQuotaExhaustedError(lastError)
  throw createError({
    statusCode: quotaExhausted ? 429 : (extractStatusCode(lastError) || 502),
    statusMessage: 'Assistant is temporarily unavailable. Please try again.',
    data: { quotaExhausted, keySlot },
  })
}

export async function generateWithGeminiFallback(
  options: GeminiGenerateOptions,
): Promise<GeminiGenerateResult> {
  const primary = options.apiKey?.trim()
  const backup = options.apiKeyBackup?.trim()
  const keys: Array<{ key: string, slot: 'primary' | 'backup' }> = []

  if (primary) keys.push({ key: primary, slot: 'primary' })
  if (backup && backup !== primary) keys.push({ key: backup, slot: 'backup' })

  if (!keys.length) {
    throw createError({
      statusCode: 503,
      statusMessage: 'Assistant is temporarily unavailable. Please try again.',
    })
  }

  let lastError: unknown

  for (let i = 0; i < keys.length; i++) {
    const { key, slot } = keys[i]!
    try {
      return await generateWithSingleKey(options, key, slot)
    }
    catch (error: unknown) {
      lastError = error
      const canSwitchKey =
        i < keys.length - 1
        && (isQuotaExhaustedError(error)
          || (error && typeof error === 'object' && 'data' in error
            && Boolean((error as { data?: { quotaExhausted?: boolean } }).data?.quotaExhausted))
          || shouldTryNextModel(error))

      if (canSwitchKey) continue
      throw error
    }
  }

  throw lastError || createError({
    statusCode: 502,
    statusMessage: 'Assistant is temporarily unavailable. Please try again.',
  })
}
