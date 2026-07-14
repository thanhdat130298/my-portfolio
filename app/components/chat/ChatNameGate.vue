<script setup lang="ts">
defineProps<{
  error?: string
  anonymous?: boolean
}>()

const nameDraft = defineModel<string>('nameDraft', { required: true })

const emit = defineEmits<{
  submit: []
  anonymous: []
  back: []
}>()
</script>

<template>
  <div class="gate">
    <p v-if="!anonymous" class="prompt">
      Trước khi tìm hiểu, hãy cho mình biết tên của bạn nhé.
    </p>
    <template v-else>
      <p class="prompt tease">
        Chào người ẩn danh! Hãy bật mí tên của bạn — mình sẽ giấu suốt đời.
      </p>
    </template>

    <form class="form" @submit.prevent="emit('submit')">
      <label class="sr-only" for="visitor-name">Tên của bạn</label>
      <input
        id="visitor-name"
        v-model="nameDraft"
        type="text"
        maxlength="60"
        placeholder="Nhập tên của bạn…"
        autocomplete="nickname"
        autofocus
      >
      <button class="btn btn-primary" type="submit" :disabled="!nameDraft.trim()">
        Vào hỏi Đạt
      </button>
    </form>

    <p v-if="error" class="error">{{ error }}</p>

    <div class="actions">
      <button
        v-if="!anonymous"
        class="btn btn-ghost"
        type="button"
        @click="emit('anonymous')"
      >
        Tôi là người ẩn danh
      </button>
      <button class="linkish" type="button" @click="emit('back')">
        Quay lại
      </button>
    </div>
  </div>
</template>

<style scoped>
.gate {
  display: grid;
  gap: 1rem;
  max-width: 28rem;
}

.prompt {
  margin: 0;
  font-size: 1.1rem;
  color: var(--color-ink-soft);
}

.tease {
  font-family: var(--font-display-vi);
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--color-ink);
  line-height: 1.4;
}

.form {
  display: grid;
  gap: 0.65rem;
}

.form input {
  border: 1px solid var(--color-line);
  border-radius: var(--radius-sm);
  padding: 0.8rem 0.9rem;
  background: var(--color-surface-elevated);
  color: var(--color-ink);
}

.form input:focus {
  outline: 2px solid rgba(249, 115, 22, 0.25);
  border-color: var(--color-accent);
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
}

.error {
  margin: 0;
  color: #a33;
  font-size: 0.92rem;
}

.linkish {
  border: 0;
  background: transparent;
  color: var(--color-muted);
  cursor: pointer;
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 3px;
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
</style>
