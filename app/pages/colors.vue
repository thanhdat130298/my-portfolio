<script setup lang="ts">
const swatches = [
  { name: 'Orange 500 (accent)', varName: '--color-accent', hex: '#f97316' },
  { name: 'Orange 600', varName: '--color-accent-deep', hex: '#ea580c' },
  { name: 'Orange 100', varName: '--color-accent-soft', hex: '#ffedd5' },
  { name: 'Orange 50 / page', varName: '--color-surface', hex: '#fff7ed' },
  { name: 'Purple 600', varName: '--color-purple', hex: '#9333ea' },
  { name: 'Purple 500', varName: '--color-purple-mid', hex: '#a855f7' },
  { name: 'Purple 50', varName: '--color-purple-soft', hex: '#faf5ff' },
  { name: 'Pink 500', varName: '--color-pink', hex: '#ec4899' },
  { name: 'Ink / zinc-900', varName: '--color-ink', hex: '#18181b' },
  { name: 'Muted / gray-600', varName: '--color-muted', hex: '#4b5563' },
  { name: 'White', varName: '--color-surface-elevated', hex: '#ffffff' },
]

useHead({
  title: 'Color palette — Dat Nguyen',
})
</script>

<template>
  <div class="page">
    <div class="container">
      <p class="eyebrow">Cloned from Koder shelter preview</p>
      <h1>Portfolio color palette</h1>
      <p class="lead">
        Orange → purple theme matching
        <a href="https://preview--1ec4b69--019b11cd-4b9e-73e8-9174-4565d0b9d6c9.koderapps.com/" target="_blank" rel="noopener">
          the reference site
        </a>.
        <a href="/">Back home</a>.
      </p>

      <div class="hero-demo" aria-label="Brand gradient preview">
        <span class="text-gradient">DAT NGUYEN</span>
      </div>

      <div class="grid">
        <article v-for="item in swatches" :key="item.hex" class="card">
          <div class="swatch" :style="{ background: `var(${item.varName})` }" />
          <div class="meta">
            <h2>{{ item.name }}</h2>
            <code>{{ item.hex }}</code>
            <code class="var">{{ item.varName }}</code>
          </div>
        </article>
      </div>

      <div class="samples">
        <button class="btn btn-primary" type="button">Primary gradient button</button>
        <button class="btn btn-ghost" type="button">Ghost orange button</button>
        <p class="ink">Ink text</p>
        <p class="muted">Muted gray-600 body</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page {
  position: relative;
  z-index: 1;
  padding: 3rem 0 4rem;
}

.eyebrow {
  margin: 0 0 0.5rem;
  color: var(--color-accent);
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-size: 0.75rem;
}

h1 {
  margin: 0 0 0.75rem;
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 4vw, 2.6rem);
}

.lead {
  margin: 0 0 1.75rem;
  color: var(--color-muted);
}

.lead a {
  color: var(--color-accent);
  font-weight: 700;
}

.hero-demo {
  height: 7rem;
  border-radius: var(--radius-md);
  margin-bottom: 1.5rem;
  display: grid;
  place-items: center;
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 2rem;
  background: linear-gradient(180deg, var(--color-hero-a), var(--color-hero-b), var(--color-hero-c));
  box-shadow: var(--shadow-soft);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 1rem;
}

.card {
  border: 1px solid var(--color-line);
  border-radius: var(--radius-md);
  overflow: hidden;
  background: var(--color-surface-elevated);
}

.swatch {
  height: 7rem;
  border-bottom: 1px solid var(--color-line);
}

.meta {
  padding: 0.85rem;
}

h2 {
  margin: 0 0 0.4rem;
  font-size: 0.95rem;
  font-family: var(--font-display);
}

code {
  display: block;
  font-size: 0.8rem;
  color: var(--color-ink-soft);
}

code.var {
  color: var(--color-muted);
  margin-top: 0.2rem;
}

.samples {
  margin-top: 2rem;
  padding: 1.25rem;
  border: 1px solid var(--color-line);
  border-radius: var(--radius-md);
  background: var(--color-surface-elevated);
  display: flex;
  flex-wrap: wrap;
  gap: 0.85rem;
  align-items: center;
}

.samples .ink { margin: 0; color: var(--color-ink); font-weight: 700; }
.samples .muted { margin: 0; color: var(--color-muted); }
</style>
