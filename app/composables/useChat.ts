import type { SuggestedQuestion } from '~/data/suggestedQuestions'
import { suggestedQuestions as localSuggestions } from '~/data/suggestedQuestions'
import { ABUSE_REFUSAL, evaluateChatInput } from '~~/shared/chatGuards'

export type ChatStep = 'intro' | 'name' | 'anonymous' | 'chat'

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  refused?: boolean
}

export interface QuotaStatus {
  limit: number
  used: number
  remaining: number
  limited: boolean
  banned?: boolean
  day: string
}

const STORAGE_NAME = 'portfolio-visitor-name'
const STORAGE_BAN = 'portfolio-chat-banned'
const MAX_CHARS = 200

function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

export function useChat() {
  const { tm, rt, locale } = useI18n()
  const step = ref<ChatStep>('intro')
  const loading = ref(false)
  const quotaLoading = ref(false)
  const error = ref('')
  const visitorName = ref('')
  const nameDraft = ref('')
  const suggestions = ref<SuggestedQuestion[]>([...localSuggestions])
  const quota = ref<QuotaStatus | null>(null)
  const messages = ref<ChatMessage[]>([])
  const chatLocked = ref(false)

  const sessionId = useState('chat-session-id', () => uid())

  const remaining = computed(() => (chatLocked.value ? 0 : (quota.value?.remaining ?? 7)))
  const limited = computed(() => chatLocked.value || quota.value?.limited === true)
  const banned = computed(() => chatLocked.value || quota.value?.banned === true)
  const canAsk = computed(() => !limited.value && !banned.value && !loading.value)

  function syncSuggestionsFromLocale() {
    const fromLocale = tm('chat.suggestions')
    if (!Array.isArray(fromLocale) || !fromLocale.length) {
      suggestions.value = [...localSuggestions]
      return
    }

    suggestions.value = fromLocale.map((raw, index) => {
      const row = (raw && typeof raw === 'object' ? raw : {}) as Record<string, unknown>
      const fallback = localSuggestions[index]
      return {
        id: typeof row.id === 'string' ? row.id : (fallback?.id ?? `q${index + 1}`),
        question: resolveLocaleValue(row.question, rt, fallback?.question ?? ''),
        answer: resolveLocaleValue(row.answer, rt, fallback?.answer ?? ''),
        sort_order: typeof row.sort_order === 'number'
          ? row.sort_order
          : (fallback?.sort_order ?? index + 1),
      }
    })
  }

  watch(locale, () => {
    syncSuggestionsFromLocale()
  }, { immediate: true })

  function lockChatLocally(reason = 'abuse') {
    chatLocked.value = true
    if (import.meta.client) {
      localStorage.setItem(STORAGE_BAN, reason)
    }
    if (quota.value) {
      quota.value = {
        ...quota.value,
        banned: true,
        limited: true,
        remaining: 0,
        used: quota.value.limit,
      }
    }
  }

  async function notifyServerBan() {
    try {
      const res = await $fetch<{
        quota?: QuotaStatus
        reply?: string
      }>('/api/chat-ban', { method: 'POST' })
      if (res.quota) quota.value = res.quota
    }
    catch {
      // Local lock still applies.
    }
  }

  async function loadSuggestions() {
    syncSuggestionsFromLocale()
  }

  async function refreshQuota() {
    quotaLoading.value = true
    try {
      quota.value = await $fetch<QuotaStatus>('/api/chat-quota')
      if (quota.value.banned) lockChatLocally('abuse')
    }
    catch {
      quota.value = {
        limit: 7,
        used: 0,
        remaining: 7,
        limited: false,
        banned: false,
        day: new Date().toISOString().slice(0, 10),
      }
    }
    finally {
      quotaLoading.value = false
    }
  }

  function startExplore() {
    if (banned.value) {
      error.value = ABUSE_REFUSAL
      return
    }
    step.value = 'name'
    nameDraft.value = ''
    error.value = ''
  }

  function chooseAnonymous() {
    if (banned.value) {
      error.value = ABUSE_REFUSAL
      return
    }
    step.value = 'anonymous'
    nameDraft.value = ''
    error.value = ''
  }

  function startChatWithName(name: string) {
    const cleaned = name.trim().slice(0, 60)
    if (!cleaned) {
      error.value = 'Cho mình biết tên của bạn với.'
      return
    }

    const nameGuard = evaluateChatInput('ok', cleaned)
    if (nameGuard.blocked) {
      error.value = nameGuard.banChat
        ? ABUSE_REFUSAL
        : 'Tên hơi kỳ — thử tên ngắn, bình thường giúp mình nha.'
      if (nameGuard.banChat) {
        lockChatLocally('abuse')
        void notifyServerBan()
      }
      return
    }

    if (banned.value) {
      error.value = ABUSE_REFUSAL
      return
    }

    visitorName.value = cleaned
    error.value = ''

    if (import.meta.client) {
      localStorage.setItem(STORAGE_NAME, cleaned)
    }

    step.value = 'chat'
    void (async () => {
      await Promise.all([refreshQuota(), loadSuggestions()])

      if (banned.value) {
        messages.value = [
          {
            id: uid(),
            role: 'system',
            content: ABUSE_REFUSAL,
          },
        ]
        return
      }

      if (limited.value) {
        messages.value = [
          {
            id: uid(),
            role: 'system',
            content:
              `Chào ${cleaned}! Bạn đã đạt giới hạn 7 câu hỏi hôm nay. Hãy quay lại vào ngày mai nhé — tạm thời xem các câu hỏi gợi ý bên dưới cũng được.`,
          },
        ]
        return
      }

      messages.value = [
        {
          id: uid(),
          role: 'assistant',
          content: `Chào ${cleaned}! Bạn có ${remaining.value} câu hỏi để hỏi về Đạt hôm nay. Hỏi ngắn thôi nha (tối đa ${MAX_CHARS} ký tự) — mình trả lời dí dỏm và gọn. Bắt đầu thôi!`,
        },
      ]
    })()
  }

  function submitName() {
    startChatWithName(nameDraft.value)
  }

  function askSuggestion(item: SuggestedQuestion) {
    if (banned.value) return
    messages.value.push({ id: uid(), role: 'user', content: item.question })
    messages.value.push({ id: uid(), role: 'assistant', content: item.answer })
  }

  async function sendMessage(text: string) {
    const trimmed = text.trim()
    if (!trimmed || loading.value) return

    if (trimmed.length > MAX_CHARS) {
      error.value = `Tin nhắn tối đa ${MAX_CHARS} ký tự.`
      return
    }

    if (banned.value) {
      error.value = ABUSE_REFUSAL
      return
    }

    if (limited.value) {
      error.value = 'Bạn đã đạt giới hạn câu hỏi, hãy quay lại vào ngày mai.'
      return
    }

    const localGuard = evaluateChatInput(trimmed, visitorName.value)
    if (localGuard.blocked) {
      error.value = ''
      messages.value.push({ id: uid(), role: 'user', content: trimmed })
      messages.value.push({
        id: uid(),
        role: 'assistant',
        content: localGuard.reply,
        refused: true,
      })

      if (localGuard.banChat) {
        lockChatLocally('abuse')
        void notifyServerBan()
        messages.value.push({
          id: uid(),
          role: 'system',
          content: 'Chat đã bị khóa vì ngôn từ không phù hợp.',
        })
      }
      return
    }

    error.value = ''
    messages.value.push({ id: uid(), role: 'user', content: trimmed })
    loading.value = true

    try {
      const res = await $fetch<{
        reply: string
        refused?: boolean
        chatLocked?: boolean
        blockKind?: string
        quota?: QuotaStatus
      }>('/api/chat', {
        method: 'POST',
        body: {
          message: trimmed,
          sessionId: sessionId.value,
          visitorName: visitorName.value,
        },
      })

      if (res.quota) quota.value = res.quota

      messages.value.push({
        id: uid(),
        role: 'assistant',
        content: res.reply,
        refused: res.refused,
      })

      if (res.chatLocked || res.quota?.banned || res.blockKind === 'abuse') {
        lockChatLocally('abuse')
        messages.value.push({
          id: uid(),
          role: 'system',
          content: 'Chat đã bị khóa vì ngôn từ không phù hợp.',
        })
        return
      }

      if (res.quota?.limited) {
        messages.value.push({
          id: uid(),
          role: 'system',
          content:
            'Bạn đã đạt giới hạn 7 câu hỏi hôm nay. Hãy quay lại vào ngày mai nhé! Trong lúc chờ, xem các câu hỏi gợi ý bên dưới cũng được.',
        })
      }
    }
    catch (e: unknown) {
      const statusCode =
        e && typeof e === 'object' && 'statusCode' in e
          ? Number((e as { statusCode?: number }).statusCode)
          : 0

      if (statusCode === 429) {
        await refreshQuota()
        messages.value.push({
          id: uid(),
          role: 'system',
          content:
            'Bạn đã đạt giới hạn 7 câu hỏi hôm nay. Hãy quay lại vào ngày mai nhé! Có thể xem các câu hỏi được setup sẵn bên dưới.',
        })
      }
      else {
        messages.value.push({
          id: uid(),
          role: 'assistant',
          content:
            'Ối, mình đang hơi lag. Thử lại sau một chút, hoặc ghé phần Contact nhé!',
          refused: true,
        })
      }
    }
    finally {
      loading.value = false
    }
  }

  function resetToIntro() {
    if (banned.value) return
    step.value = 'intro'
    nameDraft.value = ''
    error.value = ''
  }

  onMounted(() => {
    if (import.meta.client && localStorage.getItem(STORAGE_BAN)) {
      chatLocked.value = true
    }
    void refreshQuota()
    void loadSuggestions()
  })

  return {
    MAX_CHARS,
    step,
    loading,
    quotaLoading,
    error,
    visitorName,
    nameDraft,
    suggestions,
    quota,
    messages,
    remaining,
    limited,
    banned,
    chatLocked,
    canAsk,
    startExplore,
    chooseAnonymous,
    submitName,
    askSuggestion,
    sendMessage,
    refreshQuota,
    loadSuggestions,
    resetToIntro,
  }
}

function resolveLocaleValue(value: unknown, resolve: (message: unknown) => string, fallback: string) {
  if (typeof value === 'string') return value
  if (value == null) return fallback
  try {
    return resolve(value) || fallback
  }
  catch {
    return fallback
  }
}
