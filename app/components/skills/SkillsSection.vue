<script setup lang="ts">
const { t } = useI18n()
const { skillsFrontendItems, skillsBackendItems, languages } = useLocalizedPortfolio()
</script>

<template>
  <section id="skills" class="section">
    <div class="container">
      <RevealOnScroll>
        <SectionHeading
          :label="t('sections.skills.label')"
          :title="t('sections.skills.title')"
          :lead="t('sections.skills.lead')"
        />
      </RevealOnScroll>

      <RevealOnScroll>
        <div class="lanes">
          <article class="lane primary">
            <p class="lane-label">{{ t('sections.skills.primary') }}</p>
            <h3>{{ t('sections.skills.frontendTitle') }}</h3>
            <p class="lane-lead">{{ t('sections.skills.frontendLead') }}</p>
            <ul>
              <li v-for="item in skillsFrontendItems" :key="item">{{ item }}</li>
            </ul>
          </article>

          <article class="lane">
            <p class="lane-label">{{ t('sections.skills.also') }}</p>
            <h3>{{ t('sections.skills.backendTitle') }}</h3>
            <p class="lane-lead">{{ t('sections.skills.backendLead') }}</p>
            <ul>
              <li v-for="item in skillsBackendItems" :key="item">{{ item }}</li>
            </ul>
          </article>
        </div>

        <div class="meta">
          <div>
            <h4>{{ t('sections.skills.workingStyle') }}</h4>
            <p>{{ t('sections.skills.softSkills') }}</p>
          </div>
          <div>
            <h4>{{ t('sections.skills.languages') }}</h4>
            <ul>
              <li v-for="lang in languages" :key="lang.name">
                <strong>{{ lang.name }}</strong> — {{ lang.level }}
              </li>
            </ul>
          </div>
        </div>
      </RevealOnScroll>
    </div>
  </section>
</template>

<style scoped>
.lanes {
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  gap: 1.25rem;
}

.lane {
  padding: 1.4rem 1.3rem;
  border: 1px solid var(--color-line);
  border-radius: var(--radius-md);
  background: var(--color-surface-elevated);
}

.lane.primary {
  background: linear-gradient(180deg, var(--color-accent-soft), var(--color-surface-elevated));
  border-color: var(--color-accent-border);
}

.lane-label {
  margin: 0 0 0.45rem;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-accent);
}

.lane h3 {
  margin: 0 0 0.45rem;
  font-family: var(--font-display);
  font-size: 1.45rem;
}

.lane-lead {
  margin: 0 0 1rem;
  color: var(--color-muted);
}

.lane ul {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.lane li {
  background: color-mix(in srgb, var(--color-surface) 70%, var(--color-surface-elevated));
  border: 1px solid var(--color-line);
  padding: 0.35rem 0.7rem;
  border-radius: var(--radius-sm);
  font-size: 0.92rem;
  font-weight: 600;
  color: var(--color-ink);
}

.meta {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--color-line);
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 1.5rem;
}

.meta h4 {
  margin: 0 0 0.5rem;
  font-family: var(--font-display);
  font-size: 1.05rem;
}

.meta p,
.meta li {
  margin: 0;
  color: var(--color-muted);
}

.meta ul {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 0.35rem;
}

@media (max-width: 800px) {
  .lanes,
  .meta {
    grid-template-columns: 1fr;
  }
}
</style>
