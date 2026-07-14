<script setup lang="ts">
const root = ref<HTMLElement | null>(null)
useReveal(root)
</script>

<template>
  <div ref="root" class="reveal">
    <slot />
  </div>
</template>
