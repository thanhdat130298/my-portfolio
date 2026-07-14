<script setup lang="ts">
import { portfolio } from '~/data/portfolio'
</script>

<template>
  <section id="about" class="section about">
    <div class="container">
      <RevealOnScroll>
        <SectionHeading
          label="About"
          title="Frontend first, fullstack direction"
          :lead="portfolio.about.intro"
        />
      </RevealOnScroll>

      <RevealOnScroll>
        <div class="grid">
          <article v-for="point in portfolio.about.points" :key="point.title" class="point">
            <h3>{{ point.title }}</h3>
            <p>{{ point.text }}</p>
          </article>
        </div>
        <p class="looking">{{ portfolio.lookingFor }}</p>
      </RevealOnScroll>
    </div>
  </section>
</template>

<style scoped>
.about {
  background: linear-gradient(180deg, transparent, rgba(255, 237, 213, 0.45), transparent);
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.75rem;
}

.point h3 {
  margin: 0 0 0.5rem;
  font-family: var(--font-display);
  font-size: 1.15rem;
  color: var(--color-accent);
}

.point p {
  margin: 0;
  color: var(--color-ink-soft);
}

.looking {
  margin: 2rem 0 0;
  max-width: 44rem;
  color: var(--color-muted);
  font-style: italic;
}

@media (max-width: 800px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
