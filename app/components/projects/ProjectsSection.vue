<script setup lang="ts">
import { portfolio } from '~/data/portfolio'
</script>

<template>
  <section id="projects" class="section">
    <div class="container">
      <RevealOnScroll>
        <SectionHeading
          label="Featured work"
          title="Projects that shaped the craft"
          lead="Selected product, channel, landing, and backend work — frontend-led delivery with fullstack exposure."
        />
      </RevealOnScroll>

      <RevealOnScroll>
        <div class="grid">
          <ProjectCard
            v-for="project in portfolio.projects"
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
