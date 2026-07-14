<script setup lang="ts">
defineProps<{
  name: string
  idea: string
  stack: string[]
  demoUrl?: string
  githubUrl: string
  note?: string
}>()

const { t } = useI18n()
</script>

<template>
  <article class="card">
    <header class="head">
      <div class="title-row">
        <h3>{{ name }}</h3>
        <span
          v-if="note"
          class="warn"
          tabindex="0"
          role="img"
          :aria-label="note"
        >
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
            <path
              fill="currentColor"
              d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2Zm0 15a1.25 1.25 0 1 1 1.25-1.25A1.25 1.25 0 0 1 12 17Zm1.1-4.35a1.1 1.1 0 0 1-2.2 0l-.35-5a1.45 1.45 0 0 1 2.9 0Z"
            />
          </svg>
          <span class="tooltip" role="tooltip">{{ note }}</span>
        </span>
      </div>
      <a
        class="github"
        :href="githubUrl"
        target="_blank"
        rel="noopener noreferrer"
        :aria-label="`${t('ui.github')}: ${name}`"
        :title="t('ui.github')"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" width="20" height="20">
          <path
            fill="currentColor"
            d="M12 2C6.477 2 2 6.486 2 12.021c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.866-.013-1.7-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.004.071 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.22-.253-4.555-1.113-4.555-4.952 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.56 9.56 0 0 1 2.504.337c1.909-1.296 2.747-1.026 2.747-1.026.546 1.378.203 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.944.359.31.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.021C22 6.486 17.523 2 12 2Z"
          />
        </svg>
      </a>
    </header>

    <div class="block">
      <p class="label">{{ t('ui.idea') }}</p>
      <p class="idea">{{ idea }}</p>
    </div>

    <div class="block">
      <p class="label">{{ t('ui.stack') }}</p>
      <div class="stack">
        <span v-for="tech in stack" :key="tech">{{ tech }}</span>
      </div>
    </div>

    <div v-if="demoUrl" class="links">
      <a
        class="btn btn-primary link"
        :href="demoUrl"
        target="_blank"
        rel="noopener noreferrer"
      >
        {{ t('ui.demo') }}
      </a>
    </div>
  </article>
</template>

<style scoped>
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.35rem 1.25rem;
  border: 1px solid var(--color-line);
  border-radius: var(--radius-md);
  background: var(--color-surface-elevated);
  min-height: 100%;
  transition: border-color 0.2s ease, transform 0.2s ease;
}

.card:hover {
  border-color: var(--color-accent-border);
  transform: translateY(-2px);
}

.head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.75rem;
}

.title-row {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  min-width: 0;
  flex: 1;
}

h3 {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.3rem;
  letter-spacing: -0.02em;
}

.warn {
  position: relative;
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.7rem;
  height: 1.7rem;
  border-radius: 999px;
  border: 1px solid var(--color-accent-border);
  color: var(--color-accent-deep);
  background: var(--color-accent-soft);
  cursor: help;
}

.tooltip {
  position: absolute;
  left: 0;
  bottom: calc(100% + 0.45rem);
  transform: translateY(0.25rem);
  width: min(16.5rem, 70vw);
  padding: 0.65rem 0.75rem;
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-accent-border);
  background: var(--color-surface-elevated);
  color: var(--color-ink);
  box-shadow: var(--shadow-soft);
  font-size: 0.82rem;
  font-weight: 600;
  line-height: 1.45;
  text-align: left;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: opacity 0.18s ease, transform 0.18s ease, visibility 0.18s ease;
  z-index: 5;
}

.tooltip::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 0.85rem;
  border: 6px solid transparent;
  border-top-color: var(--color-accent-border);
}

.warn:hover .tooltip,
.warn:focus-visible .tooltip {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}


.github {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.15rem;
  height: 2.15rem;
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-line);
  color: var(--color-ink);
  background: color-mix(in srgb, var(--color-surface) 70%, var(--color-surface-elevated));
  transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease;
}

.github:hover {
  color: var(--color-accent);
  border-color: var(--color-accent-border);
  background: var(--color-accent-soft);
}

.block {
  display: grid;
  gap: 0.4rem;
}

.label {
  margin: 0;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-accent);
}

.idea {
  margin: 0;
  color: var(--color-ink-soft);
  line-height: 1.6;
}

.stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.stack span {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--color-ink);
  background: var(--color-accent-soft);
  padding: 0.28rem 0.55rem;
  border-radius: var(--radius-sm);
}

.links {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.6rem;
  margin-top: auto;
  padding-top: 0.25rem;
}

.link {
  min-height: 2.4rem;
  padding: 0.45rem 1rem;
  font-size: 0.88rem;
}
</style>
