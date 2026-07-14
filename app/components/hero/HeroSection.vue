<script setup lang="ts">
import bannerImg from '~/assets/images/banner.png'

const { t } = useI18n()
const { name, stats } = useLocalizedPortfolio()
</script>

<template>
  <section id="top" class="hero">
    <div class="container hero-inner">
      <div class="hero-copy hero-animate">
        <p class="eyebrow">
          <span class="pill">{{ t('hero.role') }} · {{ t('hero.location') }}</span>
        </p>
        <h1>
          <span class="welcome">{{ t('hero.welcome') }}</span>
          <span class="brand text-gradient">{{ name }}</span>
        </h1>
        <p class="support">{{ t('hero.summary') }}</p>
        <div class="actions">
          <a class="btn btn-primary" href="#projects">{{ t('hero.viewProjects') }}</a>
          <a class="btn btn-ghost" href="#contact">{{ t('ui.contactMe') }}</a>
        </div>
        <div class="hero-stats" :aria-label="t('hero.highlights')">
          <div
            v-for="(stat, index) in stats"
            :key="stat.label"
            class="stat"
            :data-i="index"
          >
            <p class="value">{{ stat.value }}</p>
            <p class="label">{{ stat.label }}</p>
          </div>
        </div>
      </div>

      <div class="hero-visual hero-animate-visual">
        <div class="glow" aria-hidden="true" />
        <div class="portrait">
          <img
            class="banner"
            :src="bannerImg"
            :alt="t('hero.bannerAlt', { name })"
            width="600"
            height="800"
          >
        </div>
        <div class="float-card" aria-hidden="true">
          <p class="float-value">{{ stats[2]?.value }}</p>
          <p class="float-label">{{ t('hero.floatLabel') }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  z-index: 1;
  padding: calc(var(--header-h) + 2.5rem) 0 clamp(3rem, 7vh, 5rem);
  overflow: hidden;
}

.hero-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(2.5rem, 5vw, 3.5rem);
}

.hero-copy {
  flex: 1;
  width: 100%;
  max-width: 40rem;
  text-align: center;
}

.eyebrow {
  margin: 0 0 1.25rem;
}

.pill {
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 999px;
  background: var(--color-accent-soft);
  color: var(--color-accent-deep);
  font-size: 0.875rem;
  font-weight: 700;
}

h1 {
  margin: 0 0 1.25rem;
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 6vw, 3.75rem);
  font-weight: 800;
  line-height: normal;
  color: var(--color-ink);
}

.welcome {
  display: block;
}

.brand {
  display: block;
}

.support {
  margin: 0 auto 1.75rem;
  max-width: 36rem;
  font-size: clamp(1.05rem, 2vw, 1.25rem);
  line-height: 1.65;
  color: var(--color-muted);
}

.actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1.75rem;
}

.hero-stats {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem 2rem;
  padding-top: 0.5rem;
}

.stat .value {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1.75rem, 3vw, 1.9rem);
  font-weight: 800;
  letter-spacing: -0.03em;
}

.stat[data-i='0'] .value { color: var(--color-accent); }
.stat[data-i='1'] .value { color: var(--color-purple-mid); }
.stat[data-i='2'] .value { color: var(--color-pink); }

.stat .label {
  margin: 0.15rem 0 0;
  color: var(--color-muted);
  font-size: 0.875rem;
}

.hero-visual {
  position: relative;
  flex: 1;
  width: 100%;
  max-width: 36rem;
}

.glow {
  position: absolute;
  inset: 8%;
  border-radius: 1.5rem;
  background: linear-gradient(90deg, #fb923c, #a855f7);
  filter: blur(48px);
  opacity: 0.22;
  animation: pulse 3.5s ease-in-out infinite;
}

.portrait {
  position: relative;
  aspect-ratio: 3 / 4;
  max-width: min(100%, 22rem);
  margin-inline: auto;
  border-radius: 1.5rem;
  overflow: hidden;
  background: linear-gradient(135deg, #fb923c, #9333ea);
  box-shadow: var(--shadow-soft);
}

.banner {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  display: block;
}

.float-card {
  position: absolute;
  right: -0.5rem;
  bottom: -1.25rem;
  display: grid;
  gap: 0.1rem;
  padding: 1rem 1.15rem;
  border-radius: 1rem;
  background: var(--color-surface-elevated);
  box-shadow: var(--shadow-soft);
  animation: float 3.2s ease-in-out infinite;
}

.float-value {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--color-ink);
}

.float-label {
  margin: 0;
  font-size: 0.85rem;
  color: var(--color-muted);
}

.hero-animate > * {
  opacity: 0;
  transform: translateY(1rem);
  animation: rise 0.8s ease forwards;
}

.hero-animate > *:nth-child(1) { animation-delay: 0.05s; }
.hero-animate > *:nth-child(2) { animation-delay: 0.15s; }
.hero-animate > *:nth-child(3) { animation-delay: 0.25s; }
.hero-animate > *:nth-child(4) { animation-delay: 0.35s; }
.hero-animate > *:nth-child(5) { animation-delay: 0.45s; }

.hero-animate-visual {
  opacity: 0;
  transform: translateY(1rem);
  animation: rise 0.9s ease 0.35s forwards;
}

@keyframes rise {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0%, 100% { opacity: 0.18; transform: scale(1); }
  50% { opacity: 0.28; transform: scale(1.03); }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-0.45rem); }
}

@media (min-width: 1024px) {
  .hero-inner {
    flex-direction: row;
    align-items: center;
    gap: 3rem;
  }

  .hero-copy {
    text-align: left;
    max-width: none;
  }

  .support {
    margin-left: 0;
    margin-right: 0;
  }

  .actions,
  .hero-stats {
    justify-content: flex-start;
  }

  .float-card {
    right: -1rem;
    bottom: -1.5rem;
  }

  .portrait {
    max-width: min(100%, 26rem);
  }
}

@media (prefers-reduced-motion: reduce) {
  .glow,
  .float-card,
  .hero-animate > *,
  .hero-animate-visual {
    animation: none;
    opacity: 1;
    transform: none;
  }
}
</style>
