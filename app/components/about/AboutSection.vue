<script setup lang="ts">
const { t } = useI18n()
const { aboutPoints } = useLocalizedPortfolio()
</script>

<template>
  <section id="about" class="section about">
    <div class="container">
      <RevealOnScroll>
        <div class="frame">
          <SectionHeading
            :label="t('sections.about.label')"
            :title="t('sections.about.title')"
            :lead="t('sections.about.intro')"
          />

          <div class="grid">
            <article
              v-for="(point, index) in aboutPoints"
              :key="point.title"
              class="point"
            >
              <span class="index" aria-hidden="true">{{ String(index + 1).padStart(2, '0') }}</span>
              <h3>{{ point.title }}</h3>
              <p>{{ point.text }}</p>
            </article>
          </div>

          <p class="looking">{{ t('sections.about.lookingFor') }}</p>
        </div>
      </RevealOnScroll>
    </div>
  </section>
</template>

<style scoped>
.about {
  position: relative;
}

.frame {
  padding: clamp(1.5rem, 4vw, 2.25rem);
  border: 1px solid var(--color-accent-border);
  border-radius: var(--radius-md);
  background:
    linear-gradient(145deg, var(--color-accent-soft), transparent 42%),
    var(--color-surface-elevated);
  box-shadow: var(--shadow-soft);
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.point {
  display: grid;
  gap: 0.45rem;
  align-content: start;
  padding: 1.1rem 1rem;
  border: 1px solid var(--color-line);
  border-radius: var(--radius-md);
  background: color-mix(in srgb, var(--color-surface) 55%, var(--color-surface-elevated));
}

.index {
  font-family: var(--font-display);
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  color: var(--color-accent);
}

.point h3 {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.2rem;
  color: var(--color-ink);
}

.point p {
  margin: 0;
  color: var(--color-ink-soft);
  line-height: 1.6;
}

.looking {
  margin: 1.35rem 0 0;
  padding: 1rem 1.15rem;
  border-left: 3px solid var(--color-accent);
  background: var(--color-accent-soft);
  color: var(--color-ink);
  font-weight: 600;
  line-height: 1.55;
}

@media (max-width: 800px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
