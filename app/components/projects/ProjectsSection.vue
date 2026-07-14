<script setup lang="ts">
const { t } = useI18n()
const { projects } = useLocalizedPortfolio()
</script>

<template>
  <section id="projects" class="section">
    <div class="container">
      <RevealOnScroll>
        <SectionHeading
          :label="t('sections.projects.label')"
          :title="t('sections.projects.title')"
          :lead="t('sections.projects.lead')"
        />
      </RevealOnScroll>

      <RevealOnScroll>
        <div class="grid">
          <ProjectCard
            v-for="project in projects"
            :key="project.id"
            :project="project"
          />
        </div>
      </RevealOnScroll>
    </div>
  </section>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.15rem;
}

@media (max-width: 960px) {
  .grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
