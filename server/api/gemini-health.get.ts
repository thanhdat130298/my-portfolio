import { generateWithGeminiFallback, parseGeminiModels } from '../utils/gemini'
import { assertAllowedOrigin } from '../utils/originAllowlist'

/**
 * Quick Gemini connectivity check (primary key, then backup key).
 * GET /api/gemini-health
 */
export default defineEventHandler(async (event) => {
  assertAllowedOrigin(event)

  const config = useRuntimeConfig()
  const primary = (config.geminiApiKey as string) || ''
  const backup = (config.geminiApiKeyBackup as string) || ''
  const models = parseGeminiModels(config.geminiModels, config.geminiModel)

  if (!primary && !backup) {
    return {
      ok: false,
      configured: false,
      message: 'GEMINI_API_KEY is not set in .env',
    }
  }

  try {
    const result = await generateWithGeminiFallback({
      apiKey: primary || backup,
      apiKeyBackup: backup,
      models,
      userText: 'Reply with exactly: OK',
      temperature: 0,
      maxOutputTokens: 16,
      thinkingBudget: 0,
    })

    return {
      ok: true,
      configured: true,
      model: result.model,
      keySlot: result.keySlot,
      sample: result.text,
      message: 'Gemini API is working',
      hasBackup: Boolean(backup && backup !== primary),
    }
  }
  catch (error: unknown) {
    const statusCode =
      error && typeof error === 'object' && 'statusCode' in error
        ? Number((error as { statusCode?: number }).statusCode)
        : undefined
    const statusMessage =
      error && typeof error === 'object' && 'statusMessage' in error
        ? String((error as { statusMessage?: string }).statusMessage)
        : undefined

    return {
      ok: false,
      configured: true,
      hasBackup: Boolean(backup && backup !== primary),
      statusCode,
      message:
        statusCode === 429
          ? 'Gemini quota exhausted on configured models/keys. Switch GEMINI_MODEL / API key, or wait and retry.'
          : statusMessage || 'Assistant is temporarily unavailable. Please try again.',
    }
  }
})
