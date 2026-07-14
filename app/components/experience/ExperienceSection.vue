<script setup lang="ts">
const { t } = useI18n()
const { experience } = useLocalizedPortfolio()
</script>

<template>
  <section id="career" class="section">
    <div class="container">
      <RevealOnScroll>
        <SectionHeading
          :label="t('sections.career.label')"
          :title="t('sections.career.title')"
          :lead="t('sections.career.lead')"
        />
      </RevealOnScroll>

      <RevealOnScroll>
        <div class="timeline">
          <ExperienceItem
            v-for="(item, index) in experience"
            :key="item.id"
            :item="item"
            :default-open="index === 0"
          />
        </div>
      </RevealOnScroll>
    </div>
  </section>
</template>

<style scoped>
.timeline {
  display: grid;
  gap: 2.25rem;
}
</style>
