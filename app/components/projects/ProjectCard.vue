<script setup lang="ts">
import type { ProjectItem } from '~/data/portfolio'

defineProps<{
  project: ProjectItem
}>()
</script>

<template>
  <article class="project">
    <div class="top">
      <p class="period">{{ project.period }}</p>
      <p class="company">{{ project.company }}</p>
    </div>
    <h3>{{ project.name }}</h3>
    <p class="desc">{{ project.description }}</p>
    <ul class="highlights">
      <li v-for="item in project.highlights.slice(0, 3)" :key="item">{{ item }}</li>
    </ul>
    <div class="stack">
      <span v-for="tech in project.stack" :key="tech">{{ tech }}</span>
    </div>
  </article>
</template>

<style scoped>
.project {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  padding: 1.35rem 1.25rem;
  border: 1px solid var(--color-line);
  border-radius: var(--radius-md);
  background: var(--color-surface-elevated);
  min-height: 100%;
  transition: border-color 0.2s ease, transform 0.2s ease;
}

.project:hover {
  border-color: rgba(249, 115, 22, 0.35);
  transform: translateY(-2px);
}

.top {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.35rem 0.75rem;
  font-size: 0.88rem;
}

.company {
  margin: 0;
  color: var(--color-accent);
  font-weight: 700;
}

.period {
  margin: 0;
  color: var(--color-muted);
}

h3 {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.3rem;
  letter-spacing: -0.02em;
}

.desc {
  margin: 0;
  color: var(--color-ink-soft);
  flex: 1;
}

.highlights {
  margin: 0;
  padding-left: 1.1rem;
  color: var(--color-muted);
  display: grid;
  gap: 0.2rem;
  font-size: 0.92rem;
}

.stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 0.15rem;
}

.stack span {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--color-ink-soft);
  background: var(--color-accent-soft);
  padding: 0.28rem 0.55rem;
  border-radius: var(--radius-sm);
}
</style>
