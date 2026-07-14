<script setup lang="ts">
import { portfolio } from '~/data/portfolio'
</script>

<template>
  <section id="career" class="section">
    <div class="container">
      <RevealOnScroll>
        <SectionHeading
          label="Career notes"
          title="Places and projects along the way"
          lead="Instead of fake testimonials — real teams and products from the CV timeline."
        />
      </RevealOnScroll>

      <RevealOnScroll>
        <div class="timeline">
          <ExperienceItem
            v-for="item in portfolio.experience"
            :key="item.id"
            :item="item"
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
