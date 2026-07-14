<script setup lang="ts">
const { t, locale } = useI18n()
const {
  MAX_CHARS,
  step,
  loading,
  error,
  visitorName,
  nameDraft,
  suggestions,
  quota,
  messages,
  remaining,
  limited,
  banned,
  startExplore,
  chooseAnonymous,
  submitName,
  askSuggestion,
  sendMessage,
  resetToIntro,
} = useChat()

const inLobby = computed(() =>
  step.value === 'intro' || step.value === 'name' || step.value === 'anonymous',
)
</script>

<template>
  <section id="meet-dat" class="section meet">
    <div class="container">
      <RevealOnScroll>
        <div class="panel" :class="{ lobby: inLobby }">
          <SectionHeading
            :vi="locale === 'vi'"
            :label="t('chat.label')"
            :title="t('chat.title')"
            :lead="t('chat.lead')"
          />

          <div class="stage">
            <div v-if="banned && step === 'intro'" class="intro banned">
              <p>{{ t('chat.banned') }}</p>
            </div>

            <div v-else-if="step === 'intro'" class="intro">
              <p>{{ t('chat.intro') }}</p>
              <button class="btn btn-primary cta" type="button" @click="startExplore">
                {{ t('chat.cta') }}
              </button>
            </div>

            <ChatNameGate
              v-else-if="step === 'name' || step === 'anonymous'"
              v-model:name-draft="nameDraft"
              :anonymous="step === 'anonymous'"
              :error="error"
              @submit="submitName"
              @anonymous="chooseAnonymous"
              @back="resetToIntro"
            />

            <ChatRoom
              v-else
              :messages="messages"
              :suggestions="suggestions"
              :loading="loading"
              :limited="limited"
              :banned="banned"
              :remaining="remaining"
              :quota="quota"
              :max-chars="MAX_CHARS"
              :visitor-name="visitorName"
              @send="sendMessage"
              @select-suggestion="askSuggestion"
            />
          </div>
        </div>
      </RevealOnScroll>
    </div>
  </section>
</template>

<style scoped>
.panel {
  padding: clamp(1.35rem, 3.5vw, 2rem);
  border: 1px solid var(--color-line);
  border-radius: var(--radius-md);
  background: var(--color-surface-elevated);
  box-shadow: var(--shadow-soft);
}

.panel.lobby {
  border-color: var(--color-accent-border);
  background:
    linear-gradient(160deg, var(--color-accent-soft), transparent 46%),
    var(--color-surface-elevated);
}

.panel.lobby :deep(.heading) {
  margin-bottom: 0.35rem;
  text-align: center;
}

.panel.lobby :deep(.section-lead) {
  max-width: 40rem;
  margin-inline: auto;
}

.stage {
  margin-top: 0.35rem;
  padding-top: 1.25rem;
  border-top: 1px solid var(--color-line);
}

.intro {
  display: grid;
  gap: 1.15rem;
  justify-items: center;
  text-align: center;
  max-width: 34rem;
  margin-inline: auto;
  padding: 0.35rem 0 0.15rem;
}

.intro p {
  margin: 0;
  color: var(--color-ink-soft);
  font-size: 1.05rem;
  line-height: 1.65;
}

.intro.banned p {
  color: var(--color-accent-deep);
  font-weight: 600;
}

.cta {
  min-height: 3rem;
}
</style>
