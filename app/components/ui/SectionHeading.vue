<script setup lang="ts">
withDefaults(
  defineProps<{
    label: string
    title: string
    lead?: string
    /** Prefer for Vietnamese titles (same stack; kept for call-site clarity). */
    vi?: boolean
  }>(),
  { vi: false },
)
</script>

<template>
  <div class="heading">
    <p class="section-label">{{ label }}</p>
    <h2 class="section-title" :class="{ 'is-vi': vi }">{{ title }}</h2>
    <p v-if="lead" class="section-lead">{{ lead }}</p>
  </div>
</template>

<style scoped>
.heading {
  margin-bottom: 2.25rem;
}
</style>
