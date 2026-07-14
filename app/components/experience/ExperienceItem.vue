<script setup lang="ts">
import type { ExperienceItem } from '~/data/portfolio'

const props = defineProps<{
  item: ExperienceItem
  defaultOpen?: boolean
}>()

const open = ref(props.defaultOpen === true)
const panelId = `exp-panel-${props.item.id}`

function toggle() {
  open.value = !open.value
}
</script>

<template>
  <article class="item" :class="{ 'is-open': open }">
    <div class="rail" aria-hidden="true" />
    <div class="body">
      <button
        class="toggle"
        type="button"
        :aria-expanded="open"
        :aria-controls="panelId"
        @click="toggle"
      >
        <div class="top">
          <h3>{{ item.company }}</h3>
          <p class="period">{{ item.period }}</p>
        </div>
        <p class="role">{{ item.role }}</p>
        <span class="chevron" aria-hidden="true" />
      </button>

      <div :id="panelId" class="panel" role="region">
        <div class="panel-inner">
          <ul v-if="item.achievements?.length" class="achievements">
            <li v-for="award in item.achievements" :key="award">{{ award }}</li>
          </ul>
          <ul class="projects">
            <li v-for="project in item.projects" :key="project.name + project.period">
              <strong>{{ project.name }}</strong>
              <span class="when">{{ project.period }}</span>
              <p>{{ project.summary }}</p>
              <div v-if="project.stack?.length" class="stack">
                <span v-for="tech in project.stack" :key="tech">{{ tech }}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </article>
</template>

<style scoped>
.item {
  display: grid;
  grid-template-columns: 1.25rem 1fr;
  gap: 1rem;
  position: relative;
}

.rail {
  width: 2px;
  margin-inline: auto;
  background: linear-gradient(var(--color-accent), rgba(147, 51, 234, 0.2));
  border-radius: 999px;
  position: relative;
}

.rail::before {
  content: '';
  position: absolute;
  top: 0.35rem;
  left: 50%;
  width: 0.7rem;
  height: 0.7rem;
  border-radius: 50%;
  background: var(--color-accent);
  transform: translateX(-50%);
  box-shadow: 0 0 0 4px var(--color-accent-soft);
}

.toggle {
  position: relative;
  width: 100%;
  margin: 0;
  padding: 0.15rem 2rem 0.15rem 0;
  border: 0;
  background: transparent;
  text-align: left;
  color: inherit;
  cursor: pointer;
}

.toggle:focus-visible {
  outline: 2px solid rgba(249, 115, 22, 0.35);
  outline-offset: 4px;
  border-radius: var(--radius-sm);
}

.top {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.35rem 1rem;
  align-items: baseline;
}

h3 {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.3rem;
}

.period,
.when {
  color: var(--color-muted);
  font-size: 0.9rem;
}

.role {
  margin: 0.2rem 0 0;
  font-weight: 700;
  color: var(--color-accent);
}

.chevron {
  position: absolute;
  top: 0.55rem;
  right: 0.1rem;
  width: 0.55rem;
  height: 0.55rem;
  border-right: 2px solid var(--color-ink-soft);
  border-bottom: 2px solid var(--color-ink-soft);
  transform: rotate(45deg);
  transition: transform 0.25s ease;
}

.item.is-open .chevron {
  top: 0.75rem;
  transform: rotate(225deg);
}

.panel {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.28s ease;
}

.item.is-open .panel {
  grid-template-rows: 1fr;
}

.panel-inner {
  overflow: hidden;
  min-height: 0;
}

.item.is-open .panel-inner {
  padding-top: 0.9rem;
}

.achievements {
  margin: 0 0 1rem;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.achievements li {
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--color-purple-deep);
  background: var(--color-purple-soft);
  border: 1px solid rgba(147, 51, 234, 0.2);
  padding: 0.28rem 0.65rem;
  border-radius: 999px;
}

.projects {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 1.1rem;
}

.projects li p {
  margin: 0.25rem 0 0;
  color: var(--color-ink-soft);
}

.when {
  display: inline-block;
  margin-left: 0.5rem;
}

.stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-top: 0.45rem;
}

.stack span {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--color-ink-soft);
  background: rgba(249, 115, 22, 0.08);
  padding: 0.22rem 0.5rem;
  border-radius: 999px;
}

@media (prefers-reduced-motion: reduce) {
  .panel,
  .chevron {
    transition: none;
  }
}
</style>
