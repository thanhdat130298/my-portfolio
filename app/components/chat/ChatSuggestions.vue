<script setup lang="ts">
import type { SuggestedQuestion } from '~/data/suggestedQuestions'

defineProps<{
  items: SuggestedQuestion[]
}>()

defineEmits<{
  select: [item: SuggestedQuestion]
}>()
</script>

<template>
  <div class="suggestions">
    <p class="label">Câu hỏi gợi ý</p>
    <button
      v-for="item in items"
      :key="item.id"
      type="button"
      class="chip"
      @click="$emit('select', item)"
    >
      {{ item.question }}
    </button>
  </div>
</template>

<style scoped>
.suggestions {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  padding: 0.25rem 0 0.5rem;
}

.label {
  margin: 0 0 0.15rem;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-muted);
}

.chip {
  text-align: left;
  border: 1px solid var(--color-line);
  background: var(--color-surface-elevated);
  color: var(--color-ink-soft);
  border-radius: var(--radius-sm);
  padding: 0.55rem 0.7rem;
  cursor: pointer;
  font-size: 0.88rem;
  font-weight: 600;
  transition: border-color 0.2s ease, color 0.2s ease, background 0.2s ease;
}

.chip:hover {
  border-color: var(--color-accent);
  color: var(--color-accent-deep);
  background: var(--color-accent-soft);
}
</style>
