<script setup lang="ts">
import { portfolio } from '~/data/portfolio'
import avatarImg from '~/assets/images/avt.png'
</script>

<template>
  <section id="profile" class="section profile">
    <div class="container">
      <RevealOnScroll>
        <div class="panel">
          <div class="portrait">
            <img
              class="avatar"
              :src="avatarImg"
              :alt="portfolio.name"
              width="320"
              height="320"
            >
          </div>
          <div class="copy">
            <p class="badge">{{ portfolio.profile.badge }}</p>
            <h2 class="section-title">Frontend craft, fullstack ambition</h2>
            <p class="lead">{{ portfolio.profile.caption }}</p>
            <p class="edu">
              Education: Informatics Teacher Education — The University of Danang, University of Education.
            </p>
          </div>
        </div>
      </RevealOnScroll>
    </div>
  </section>
</template>

<style scoped>
.profile {
  padding-top: clamp(2rem, 5vw, 3rem);
}

.panel {
  display: grid;
  grid-template-columns: minmax(220px, 320px) 1fr;
  gap: clamp(1.5rem, 4vw, 2.75rem);
  align-items: center;
  padding: clamp(1.25rem, 3vw, 2rem);
  border: 1px solid var(--color-line);
  border-radius: var(--radius-md);
  background:
    linear-gradient(135deg, rgba(255, 237, 213, 0.75), rgba(250, 245, 255, 0.95));
}

.portrait {
  aspect-ratio: 1;
  border-radius: var(--radius-md);
  overflow: hidden;
  background: linear-gradient(135deg, #fb923c, #9333ea);
  box-shadow: var(--shadow-soft);
}

.avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  display: block;
}

.badge {
  margin: 0 0 0.65rem;
  display: inline-block;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-accent);
}

.lead {
  margin: 0 0 1rem;
  color: var(--color-ink-soft);
  font-size: 1.05rem;
  max-width: 36rem;
}

.edu {
  margin: 0;
  color: var(--color-muted);
  font-size: 0.95rem;
}

@media (max-width: 800px) {
  .panel {
    grid-template-columns: 1fr;
  }

  .portrait {
    max-width: 260px;
  }
}
</style>
