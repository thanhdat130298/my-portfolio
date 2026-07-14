<script setup lang="ts">
import { portfolio } from '~/data/portfolio'

const { contact } = portfolio
</script>

<template>
  <section id="contact" class="section contact">
    <div class="container">
      <RevealOnScroll>
        <SectionHeading
          label="Visit / reach out"
          title="Let’s talk about the next build"
          lead="Open to frontend-heavy roles with a fullstack growth path. Prefer email for opportunities."
        />
      </RevealOnScroll>

      <RevealOnScroll>
        <div class="panel">
          <div class="info">
            <div>
              <h3>Email</h3>
              <a :href="`mailto:${contact.email}`">{{ contact.email }}</a>
            </div>
            <div>
              <h3>Phone</h3>
              <a :href="`tel:${contact.phone}`">{{ contact.phoneDisplay }}</a>
            </div>
            <div>
              <h3>Address</h3>
              <p>{{ contact.address }}</p>
            </div>
            <div>
              <h3>Facebook</h3>
              <a :href="contact.facebookUrl" target="_blank" rel="noopener noreferrer">
                {{ contact.facebook }}
              </a>
            </div>
          </div>

          <div class="cta">
            <a class="btn btn-primary" :href="`mailto:${contact.email}`">Send an email</a>
            <a class="btn btn-ghost" :href="contact.facebookUrl" target="_blank" rel="noopener noreferrer">
              Open Facebook
            </a>
            <a
              v-if="contact.demoUrl"
              class="btn btn-ghost"
              :href="contact.demoUrl"
              target="_blank"
              rel="noopener noreferrer"
            >
              Live demo
            </a>
          </div>
        </div>
      </RevealOnScroll>
    </div>
  </section>
</template>

<style scoped>
.contact {
  padding-bottom: clamp(5rem, 12vw, 7rem);
}

.panel {
  display: grid;
  gap: 2rem;
  padding: 1.75rem 0 0;
  border-top: 1px solid var(--color-line);
}

.info {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

h3 {
  margin: 0 0 0.35rem;
  font-family: var(--font-display);
  font-size: 0.95rem;
  color: var(--color-accent);
}

a,
p {
  margin: 0;
  color: var(--color-ink);
  font-weight: 600;
  word-break: break-word;
}

a:hover {
  color: var(--color-accent);
}

.cta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

@media (max-width: 700px) {
  .info {
    grid-template-columns: 1fr;
  }
}
</style>
