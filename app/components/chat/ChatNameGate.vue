<script setup lang="ts">
defineProps<{
  error?: string
  anonymous?: boolean
}>()

const nameDraft = defineModel<string>('nameDraft', { required: true })
const { t, tm, rt, locale } = useI18n()

const emit = defineEmits<{
  submit: []
  anonymous: []
  back: []
}>()

function resolveNameList(): string[] {
  const raw = tm('chat.funnyNames')
  if (!Array.isArray(raw) || !raw.length) {
    return locale.value === 'vi'
      ? ['Đạt Fake', 'Người lạ 007', 'Sếp tạm thời', 'Khách VIP ảo', 'AI hỏi AI']
      : ['Definitely Not HR', 'Anonymous Potato', 'Dat’s Twin', 'Temp Boss', 'Ask-Me-Bot']
  }
  return raw.map((item) => {
    if (typeof item === 'string') return item
    try {
      return rt(item as never)
    }
    catch {
      return ''
    }
  }).filter(Boolean)
}

function pickRandomName() {
  const names = resolveNameList()
  if (!names.length) return
  let next = names[Math.floor(Math.random() * names.length)]!
  if (names.length > 1 && next === nameDraft.value.trim()) {
    const others = names.filter(n => n !== next)
    next = others[Math.floor(Math.random() * others.length)]!
  }
  nameDraft.value = next
}
</script>

<template>
  <div class="gate">
    <p v-if="!anonymous" class="prompt">
      {{ t('chat.namePrompt') }}
    </p>
    <template v-else>
      <p class="prompt tease">
        {{ t('chat.anonymousTease') }}
      </p>
    </template>

    <form class="form" @submit.prevent="emit('submit')">
      <label class="sr-only" for="visitor-name">{{ t('chat.nameLabel') }}</label>
      <div class="row">
        <input
          id="visitor-name"
          v-model="nameDraft"
          type="text"
          maxlength="60"
          :placeholder="t('chat.namePlaceholder')"
          autocomplete="nickname"
          autofocus
        >
        <button
          class="btn btn-ghost random"
          type="button"
          :title="t('chat.randomName')"
          @click="pickRandomName"
        >
          {{ t('chat.randomName') }}
        </button>
      </div>
      <button class="btn btn-primary enter" type="submit" :disabled="!nameDraft.trim()">
        {{ t('chat.enterChat') }}
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
        {{ t('chat.imAnonymous') }}
      </button>
      <button class="linkish" type="button" @click="emit('back')">
        {{ t('chat.back') }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.gate {
  display: grid;
  gap: 1rem;
  max-width: 34rem;
  margin-inline: auto;
  text-align: center;
  padding: 0.15rem 0;
}

.prompt {
  margin: 0;
  font-size: 1.05rem;
  color: var(--color-ink-soft);
  line-height: 1.6;
}

.tease {
  font-family: var(--font-display-vi);
  font-size: clamp(1.15rem, 2.4vw, 1.35rem);
  font-weight: 800;
  color: var(--color-ink);
  line-height: 1.4;
  padding: 0.85rem 1rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-accent-border);
  background: linear-gradient(135deg, var(--color-accent-soft), var(--color-purple-soft));
  box-shadow: var(--shadow-soft);
}

.form {
  display: grid;
  gap: 0.7rem;
  text-align: left;
}

.row {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 0.55rem;
}

.form input {
  border: 1px solid var(--color-line);
  border-radius: var(--radius-sm);
  padding: 0.8rem 0.9rem;
  background: color-mix(in srgb, var(--color-surface) 40%, var(--color-surface-elevated));
  color: var(--color-ink);
  min-width: 0;
}

.form input:focus {
  outline: 2px solid rgba(249, 115, 22, 0.25);
  border-color: var(--color-accent);
}

.random,
.enter {
  min-height: 2.85rem;
}

.random {
  white-space: nowrap;
  padding-inline: 0.9rem;
}

.enter {
  width: 100%;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
  justify-content: center;
}

.error {
  margin: 0;
  color: #a33;
  font-size: 0.92rem;
  text-align: left;
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

@media (max-width: 480px) {
  .row {
    grid-template-columns: 1fr;
  }
}
</style>
