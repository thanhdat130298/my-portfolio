<script setup lang="ts">
import type { ChatMessage } from '~/composables/useChat'
import type { SuggestedQuestion } from '~/data/suggestedQuestions'
import type { QuotaStatus } from '~/composables/useChat'

const props = defineProps<{
  messages: ChatMessage[]
  suggestions: SuggestedQuestion[]
  loading: boolean
  limited: boolean
  banned?: boolean
  remaining: number
  quota: QuotaStatus | null
  maxChars: number
  visitorName: string
}>()

const emit = defineEmits<{
  send: [text: string]
  selectSuggestion: [item: SuggestedQuestion]
}>()

const draft = ref('')
const listEl = ref<HTMLElement | null>(null)

watch(
  () => props.messages.length,
  async () => {
    await nextTick()
    if (listEl.value) listEl.value.scrollTop = listEl.value.scrollHeight
  },
)

function onSubmit() {
  const text = draft.value
  draft.value = ''
  emit('send', text)
}

const charCount = computed(() => draft.value.length)
</script>

<template>
  <div class="room">
    <div class="meta">
      <p class="hello">Xin chào, <strong>{{ visitorName }}</strong></p>
      <p v-if="banned" class="quota limited">
        Chat đã bị khóa vì ngôn từ không phù hợp.
      </p>
      <p v-else-if="!limited" class="quota">
        Còn <strong>{{ remaining }}</strong> / {{ quota?.limit ?? 7 }} câu hỏi hôm nay
      </p>
      <p v-else class="quota limited">
        Bạn đã đạt giới hạn câu hỏi, hãy quay lại vào ngày mai.
      </p>
    </div>

    <div ref="listEl" class="messages" aria-live="polite">
      <ChatMessage
        v-for="message in messages"
        :key="message.id"
        :message="message"
      />
      <p v-if="loading" class="typing">Đang nghĩ…</p>
    </div>

    <div v-if="!banned && (limited || messages.length <= 1)" class="faq">
      <ChatSuggestions
        :items="suggestions"
        @select="emit('selectSuggestion', $event)"
      />
    </div>

    <form v-if="!limited && !banned" class="composer" @submit.prevent="onSubmit">
      <div class="field">
        <label class="sr-only" for="chat-question">Câu hỏi</label>
        <input
          id="chat-question"
          v-model="draft"
          type="text"
          :maxlength="maxChars"
          placeholder="Hỏi về Đạt… (tối đa 200 ký tự)"
          autocomplete="off"
          :disabled="loading"
        >
        <span class="counter" :class="{ warn: charCount > maxChars - 20 }">
          {{ charCount }}/{{ maxChars }}
        </span>
      </div>
      <button
        class="btn btn-primary send"
        type="submit"
        :disabled="loading || !draft.trim()"
      >
        Gửi
      </button>
    </form>
  </div>
</template>

<style scoped>
.room {
  display: grid;
  gap: 1rem;
}

.meta {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.5rem 1rem;
  align-items: baseline;
}

.hello,
.quota {
  margin: 0;
  color: var(--color-ink-soft);
}

.quota.limited {
  color: #9a4a00;
  font-weight: 700;
}

.messages {
  min-height: 16rem;
  max-height: 26rem;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  padding: 1rem;
  border: 1px solid var(--color-line);
  border-radius: var(--radius-md);
  background: rgba(255, 255, 255, 0.55);
}

.typing {
  margin: 0;
  color: var(--color-muted);
  font-size: 0.9rem;
}

.composer {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 0.55rem;
  align-items: start;
}

.field {
  position: relative;
}

.field input {
  width: 100%;
  border: 1px solid var(--color-line);
  border-radius: var(--radius-sm);
  padding: 0.75rem 3.6rem 0.75rem 0.85rem;
  background: var(--color-surface-elevated);
  color: var(--color-ink);
}

.field input:focus {
  outline: 2px solid rgba(249, 115, 22, 0.25);
  border-color: var(--color-accent);
}

.counter {
  position: absolute;
  right: 0.7rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 0.75rem;
  color: var(--color-muted);
}

.counter.warn {
  color: #9a4a00;
}

.send {
  min-height: 2.85rem;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

@media (max-width: 600px) {
  .composer {
    grid-template-columns: 1fr;
  }
}
</style>
