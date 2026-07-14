<script setup lang="ts">
const { t } = useI18n()
const { contact } = useLocalizedPortfolio()
</script>

<template>
  <section id="contact" class="section contact">
    <div class="container">
      <RevealOnScroll>
        <SectionHeading
          :label="t('sections.contact.label')"
          :title="t('sections.contact.title')"
          :lead="t('sections.contact.lead')"
        />
      </RevealOnScroll>

      <RevealOnScroll>
        <div class="panel">
          <div class="info">
            <div>
              <h3>{{ t('sections.contact.email') }}</h3>
              <a :href="`mailto:${contact.email}`">{{ contact.email }}</a>
            </div>
            <div>
              <h3>{{ t('sections.contact.phone') }}</h3>
              <a :href="`tel:${contact.phone}`">{{ contact.phoneDisplay }}</a>
            </div>
            <div>
              <h3>{{ t('sections.contact.address') }}</h3>
              <p>{{ t('sections.contact.addressValue') }}</p>
            </div>
            <div>
              <h3>{{ t('sections.contact.facebook') }}</h3>
              <a :href="contact.facebookUrl" target="_blank" rel="noopener noreferrer">
                {{ contact.facebook }}
              </a>
            </div>
          </div>

          <div class="cta">
            <a class="btn btn-primary" :href="`mailto:${contact.email}`">{{ t('sections.contact.sendEmail') }}</a>
            <a class="btn btn-ghost" :href="contact.facebookUrl" target="_blank" rel="noopener noreferrer">
              {{ t('sections.contact.openFacebook') }}
            </a>
          </div>
        </div>
      </RevealOnScroll>
    </div>
  </section>
</template>

<style scoped>
.contact {
  padding-bottom: clamp(5rem, 12vw, 4rem);
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
