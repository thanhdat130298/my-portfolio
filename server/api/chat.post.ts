import { buildKnowledgeBase } from '~~/app/data/portfolio'
import {
  generateWithGeminiFallback,
  isUsableChatReply,
  parseGeminiModels,
  sanitizeChatReply,
} from '../utils/gemini'
import { ABUSE_REFUSAL, evaluateChatInput } from '../../shared/chatGuards'
import { getClientIp } from '../utils/requestIp'
import {
  CHAT_MAX_CHARS,
  banIp,
  consumeQuota,
  getQuotaStatus,
} from '../utils/quota'

interface ChatBody {
  message?: string
  sessionId?: string
  visitorName?: string
}

const REFUSAL =
  'Hmm, câu này hơi lạc đề với hồ sơ của Đạt rồi. Hỏi về kinh nghiệm, skill hay cách liên hệ đi — ngắn gọn thôi nha!'

function buildSystemPrompt(knowledge: string, visitorName: string) {
  return `Bạn là trợ lý AI dí dỏm trên portfolio của Nguyễn Thành Đạt (Đạt / Dat Nguyen), Web Developer ở Đà Nẵng.
Người đang chat: ${visitorName}.

Chỉ trả lời về Đạt dựa trên knowledge bên dưới (kinh nghiệm, skill, dự án, liên hệ). Không bịa thông tin.
Ngoài lề thì trả lời ngắn vui và bắt đầu bằng: [REFUSED]
Giọng vui nhẹ, tối đa 2–3 câu ngắn, đủ ý. Tiếng Việt nếu user hỏi tiếng Việt.

CẤM: bài luận, tiểu sử dài, mô tả hàng trăm/nghìn từ, outline dài. Nếu user đòi dài → [REFUSED] và bảo hỏi gọn.

QUAN TRỌNG — OUTPUT:
Chỉ một đoạn trả lời cuối cùng cho user.
KHÔNG viết suy nghĩ tiếng Anh/Việt, checklist, draft, "However", "the request is", User Name/Subject.
KHÔNG đưa option/menu. Trả lời thẳng, tối giản.

Ví dụ:
Hỏi: Đạt biết Vue không?
Trả lời: Có — Vue là món tủ của Đạt, kèm Nuxt/React/Next để ship UI.

KNOWLEDGE:
${knowledge}`
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody<ChatBody>(event)
  const message = body.message?.trim() || ''
  const visitorName = body.visitorName?.trim().slice(0, 60) || ''
  const ip = getClientIp(event)

  if (!visitorName) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Vui lòng nhập tên trước khi hỏi.',
    })
  }

  if (!message) {
    throw createError({ statusCode: 400, statusMessage: 'Message is required' })
  }

  if (message.length > CHAT_MAX_CHARS) {
    throw createError({
      statusCode: 400,
      statusMessage: `Tin nhắn tối đa ${CHAT_MAX_CHARS} ký tự.`,
    })
  }

  const before = await getQuotaStatus(ip)
  if (before.banned) {
    return {
      reply: ABUSE_REFUSAL,
      refused: true,
      blocked: true,
      blockKind: 'abuse',
      chatLocked: true,
      quota: before,
    }
  }

  if (before.limited) {
    throw createError({
      statusCode: 429,
      statusMessage: 'Bạn đã đạt giới hạn 7 câu hỏi trong 24 giờ. Hãy quay lại vào ngày mai nhé!',
      data: { limited: true, ...before },
    })
  }

  // Block attacks / abuse / long-form BEFORE quota + Gemini.
  const guard = evaluateChatInput(message, visitorName)
  if (guard.blocked) {
    const quota = guard.banChat ? await banIp(ip, guard.kind) : before
    return {
      reply: guard.reply,
      refused: true,
      blocked: true,
      blockKind: guard.kind,
      chatLocked: guard.banChat,
      quota,
    }
  }

  if (!config.geminiApiKey && !config.geminiApiKeyBackup) {
    throw createError({
      statusCode: 503,
      statusMessage: 'Assistant is temporarily unavailable. Please try again.',
    })
  }

  const quota = await consumeQuota(ip, visitorName)
  if (!quota) {
    throw createError({
      statusCode: 429,
      statusMessage: 'Bạn đã đạt giới hạn 7 câu hỏi trong 24 giờ. Hãy quay lại vào ngày mai nhé!',
      data: { limited: true, ...(await getQuotaStatus(ip)) },
    })
  }

  const models = parseGeminiModels(config.geminiModels, config.geminiModel)
  const knowledge = buildKnowledgeBase()
  const systemPrompt = buildSystemPrompt(knowledge, visitorName)

  let result: Awaited<ReturnType<typeof generateWithGeminiFallback>>
  try {
    result = await generateWithGeminiFallback({
      apiKey: config.geminiApiKey || config.geminiApiKeyBackup,
      apiKeyBackup: config.geminiApiKeyBackup,
      models,
      systemInstruction: systemPrompt,
      userText: message,
      temperature: 0.45,
      maxOutputTokens: 220,
      thinkingBudget: 0,
    })
  }
  catch (error: unknown) {
    const statusCode =
      error && typeof error === 'object' && 'statusCode' in error
        ? Number((error as { statusCode?: number }).statusCode)
        : 502

    if (statusCode === 429) {
      throw createError({
        statusCode: 429,
        statusMessage:
          'Gemini đang hết quota tạm thời. Thử lại sau khoảng 1 phút, hoặc đổi API key trong .env.',
        data: { quota, quotaExhausted: true },
      })
    }

    throw createError({
      statusCode: 502,
      statusMessage: 'Assistant is temporarily unavailable. Please try again.',
      data: { quota },
    })
  }

  let reply = sanitizeChatReply(result.text)
  if (!reply || reply.length < 12 || !isUsableChatReply(reply)) {
    reply = REFUSAL
  }

  const refused = reply.includes('[REFUSED]') || reply.startsWith(REFUSAL.slice(0, 24))
  reply = sanitizeChatReply(reply.replace('[REFUSED]', '')) || REFUSAL
  if (!isUsableChatReply(reply)) reply = REFUSAL

  if (reply.length > 420) {
    reply = `${reply.slice(0, 417).trim()}…`
  }

  return {
    reply,
    refused,
    quota,
  }
})
