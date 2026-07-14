/** Shared input guards — reject abuse before quota / Gemini. */

export const LONG_FORM_REFUSAL =
  'Đạt thích ngắn gọn thôi — mình chỉ trả lời 2–3 câu. Hỏi đúng một điểm (skill, project, liên hệ…) thay vì bài dài nha!'

export const ATTACK_REFUSAL =
  'Câu này trông giống thử hệ thống rồi. Hỏi thẳng về skill, project hay cách liên hệ với Đạt giúp mình nha!'

export const ABUSE_REFUSAL =
  'Mình không tiếp tục với ngôn từ xúc phạm. Chat đã bị khóa — hãy giữ thái độ lịch sự nếu muốn hỏi về Đạt.'

export type ChatGuardKind = 'long_form' | 'attack' | 'abuse'

export type ChatGuardResult =
  | { blocked: false }
  | { blocked: true, kind: ChatGuardKind, reply: string, banChat: boolean }

function hasLargeCount(text: string) {
  return /(?:^|[^\d])(\d{1,3}(?:[.,]\d{3})+|\d{3,})\+?(?:[^\d]|$)/.test(text)
}

/** Lowercase + strip accents + light leetspeak so variants still match. */
export function normalizeForModeration(text: string) {
  return text
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/đ/g, 'd')
    .replace(/0/g, 'o')
    .replace(/1/g, 'i')
    .replace(/3/g, 'e')
    .replace(/4/g, 'a')
    .replace(/5/g, 's')
    .replace(/\$/g, 's')
    .replace(/@/g, 'a')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function isLongFormRequest(message: string) {
  const t = message.normalize('NFC').toLowerCase()

  const lengthUnit =
    /(?:t[uừư]|words?|chars?|characters?|k[yý]\s*t[uự]|c[aâã]u|paragraphs?|[đd]o[aạ]n|pages?|trang|sentences?)/i

  if (hasLargeCount(t) && lengthUnit.test(t)) return true

  if (
    /(?:mi[eê]u\s*t[aả]|describe|write|essay|b[aà]i\s*lu[aậ]n|ti[eê]u\s*lu[aậ]n|so[aạ]n|vi[eê]t)/i.test(t)
    && hasLargeCount(t)
  ) {
    return true
  }

  if (
    /(?:b[aà]i\s*lu[aậ]n|ti[eê]u\s*lu[aậ]n|essay|long[\s-]?form|in[\s-]?depth|chi\s*ti[eế]t\s*d[aà]i|vi[eê]t\s*d[aà]i|mi[eê]u\s*t[aả]\s*d[aà]i|biography|ti[eê]u\s*s[uử]\s*d[aà]i|monologue)/i.test(
      t,
    )
  ) {
    return true
  }

  if (/(?:[ií]t\s*nh[aấ]t|t[oố]i\s*thi[eể]u|at\s*least|minimum|min\.?)\s*\d{2,}/i.test(t)) {
    return true
  }

  return false
}

export function isPromptInjection(message: string) {
  const t = message.normalize('NFC').toLowerCase()

  const patterns = [
    /ignore\s+(all\s+)?(previous|prior|above|earlier)\s+(instructions?|rules?|prompts?)/i,
    /disregard\s+(all\s+)?(previous|prior|your)\s+(instructions?|rules?)/i,
    /forget\s+(everything|your\s+(rules?|instructions?|prompt))/i,
    /(?:system\s*prompt|developer\s*message|hidden\s*prompt)/i,
    /(?:jailbreak|dan\s*mode|do\s*anything\s*now)/i,
    /you\s+are\s+now\s+(?:a|an|my|dante|unrestricted)/i,
    /act\s+as\s+(?:if\s+)?(?:you\s+have\s+no\s+rules|developer|system)/i,
    /(?:override|bypass)\s+(?:safety|guard|filter|system)/i,
    /reveal\s+(?:your\s+)?(?:system|hidden|secret)\s+(?:prompt|instructions?)/i,
    /(?:in\s+markdown\s+)?(?:print|show|dump)\s+(?:the\s+)?(?:system|full)\s+prompt/i,
    /(?:b[oỏ]qua|b[oỏ]qua\s+t[aấ]t\s*c[aả]|qu[eên])\s+(?:h[uướ]ng\s*d[aẫ]n|lu[aậ]t|prompt)/i,
    /(?:hi[eệ]n|ti[eế]t\s*l[oộ]|show).{0,20}(?:system\s*prompt|h[uướ]ng\s*d[aẫ]n\s*h[eệ]\s*th[oố]ng)/i,
    /\[(?:system|developer|assistant)\]/i,
    /<\s*(?:system|prompt|instructions?)\s*>/i,
  ]

  return patterns.some(re => re.test(t))
}

export function isSpamOrNoise(message: string) {
  const t = message.normalize('NFC').trim()

  if (!t) return true
  if (/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/.test(t)) return true
  if (/(.)\1{11,}/u.test(t)) return true
  if (/(.{2,4})\1{6,}/u.test(t)) return true

  const letters = (t.match(/\p{L}/gu) || []).length
  const digits = (t.match(/\p{N}/gu) || []).length
  const spaces = (t.match(/\s/g) || []).length
  const other = t.length - letters - digits - spaces

  if (t.length >= 12 && other / t.length > 0.55) return true
  if (t.length >= 10 && letters / t.length < 0.2) return true

  const urls = t.match(/https?:\/\/|www\./gi) || []
  if (urls.length >= 3) return true

  if (/[A-Za-z0-9+/]{80,}={0,2}/.test(t.replace(/\s/g, ''))) return true
  if (/(?:[0-9a-f]{2}[\s,:;-]?){20,}/i.test(t)) return true
  if (/<\s*script\b|javascript\s*:|onerror\s*=|onload\s*=/i.test(t)) return true

  return false
}

/**
 * Insults / vulgar / sensitive language (VI + EN).
 * Vietnamese slang prefers accented forms; avoid collapsing "lớn" → "lon".
 */
export function isAbusiveLanguage(message: string) {
  const raw = message.normalize('NFC').toLowerCase()
  const t = normalizeForModeration(message)
  if (!raw && !t) return false

  // Unicode-aware edges (JS \b fails on Vietnamese letters).
  const edge = (token: string) =>
    new RegExp(`(?<![\\p{L}\\p{N}])${token}(?![\\p{L}\\p{N}])`, 'iu')

  const rawTokens = [
    'lồn', 'cặc', 'buồi', 'địt', 'đụ', 'đĩ', 'đéo', 'đệch',
    'đmm', 'đm', 'đcm', 'vcl', 'clmm', 'cmm',
  ]
  if (rawTokens.some(tok => edge(tok).test(raw))) return true

  if (/(?:địt\s*mẹ|đụ\s*mẹ|đụ\s*má|con\s*chó|thằng\s*chó|đồ\s*ngu|khốn\s*nạn)/i.test(raw)) {
    return true
  }

  const normTokens = [
    'ditme', 'dmm', 'dcm', 'dmc', 'clmm', 'clm', 'cmm', 'vcl', 'deo', 'dech', 'cak',
  ]
  if (normTokens.some(tok => edge(tok).test(t))) return true

  if (
    /(?:dit\s*me|du\s*me|du\s*ma|oc\s*cho|thang\s*cho|do\s*cho|do\s*ngu|thang\s*ngu|khon\s*nan|dau\s*buoi|mat\s*lon)/i.test(
      t,
    )
  ) {
    return true
  }

  const enPatterns: RegExp[] = [
    /\b(?:fuck|fucking|fucker|motherfucker|shit|bitch|asshole|bastard|cunt|whore|slut|dickhead)\b/i,
    /\b(?:nigger|nigga|faggot|tranny)\b/i,
    /\b(?:kill\s*yourself|kys|go\s*die|rape\s*you)\b/i,
    /\b(?:porn|onlyfans|xxx|nudes?|blowjob|handjob|cumshot)\b/i,
  ]

  return enPatterns.some(re => re.test(t))
}

export function isSuspiciousVisitorName(name: string) {
  const t = name.normalize('NFC').trim()
  if (!t || t.length > 60) return true
  if (/[\u0000-\u001F\u007F]/.test(t)) return true
  if (/(.)\1{8,}/u.test(t)) return true
  if (isPromptInjection(t)) return true
  if (isAbusiveLanguage(t)) return true
  if (/<\s*script\b|https?:\/\//i.test(t)) return true
  const letters = (t.match(/\p{L}/gu) || []).length
  if (letters < 1) return true
  return false
}

/**
 * Block bad input before consumeQuota / Gemini.
 * Abusive language also signals a hard chat ban (server IP + client lock).
 */
export function evaluateChatInput(message: string, visitorName?: string): ChatGuardResult {
  if (visitorName && isSuspiciousVisitorName(visitorName)) {
    const abuseName = isAbusiveLanguage(visitorName)
    return {
      blocked: true,
      kind: abuseName ? 'abuse' : 'attack',
      reply: abuseName ? ABUSE_REFUSAL : ATTACK_REFUSAL,
      banChat: abuseName,
    }
  }

  if (isAbusiveLanguage(message)) {
    return { blocked: true, kind: 'abuse', reply: ABUSE_REFUSAL, banChat: true }
  }

  if (isLongFormRequest(message)) {
    return { blocked: true, kind: 'long_form', reply: LONG_FORM_REFUSAL, banChat: false }
  }

  if (isPromptInjection(message) || isSpamOrNoise(message)) {
    return { blocked: true, kind: 'attack', reply: ATTACK_REFUSAL, banChat: false }
  }

  return { blocked: false }
}
