<script setup lang="ts">
import type { ChatMessage } from '~/composables/useChat'

defineProps<{
  message: ChatMessage
}>()
</script>

<template>
  <div class="msg" :class="message.role">
    <p>{{ message.content }}</p>
  </div>
</template>

<style scoped>
.msg {
  max-width: 92%;
  padding: 0.7rem 0.85rem;
  border-radius: var(--radius-md);
  font-size: 0.92rem;
  line-height: 1.45;
}

.msg p {
  margin: 0;
  white-space: pre-wrap;
}

.msg.user {
  margin-left: auto;
  background: var(--color-accent);
  color: #fff;
  border-bottom-right-radius: 4px;
}

.msg.assistant,
.msg.system {
  margin-right: auto;
  background: var(--color-surface);
  border: 1px solid var(--color-line);
  color: var(--color-ink);
  border-bottom-left-radius: 4px;
}

.msg.system {
  background: #fff6e8;
  border-color: rgba(154, 74, 0, 0.2);
  color: #6b3a00;
  max-width: 100%;
}
</style>
