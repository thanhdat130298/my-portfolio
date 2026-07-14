<script setup lang="ts">
import PersonalProjectCard from '~/components/projects/PersonalProjectCard.vue'

const { t } = useI18n()
const { personalProjects } = useLocalizedPortfolio()
</script>

<template>
  <section id="personal" class="section personal">
    <div class="container">
      <SectionHeading
        :label="t('sections.personal.label')"
        :title="t('sections.personal.title')"
        :lead="t('sections.personal.lead')"
      />

      <div class="grid">
        <PersonalProjectCard
          v-for="project in personalProjects"
          :key="project.id"
          :name="project.name"
          :idea="project.idea"
          :stack="project.stack"
          :demo-url="project.demoUrl"
          :github-url="project.githubUrl"
          :note="project.note"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.personal {
  background: linear-gradient(
    180deg,
    color-mix(in srgb, var(--color-accent-soft) 55%, transparent),
    color-mix(in srgb, var(--color-purple-soft) 70%, transparent) 55%,
    color-mix(in srgb, var(--color-accent-soft) 35%, transparent)
  );
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.15rem;
}

@media (max-width: 720px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
