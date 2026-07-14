<script setup lang="ts">
import { portfolio } from '~/data/portfolio'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="container footer-inner">
      <p class="brand">{{ portfolio.brand }}</p>
      <p class="copy">© {{ year }} {{ portfolio.name }}</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  position: relative;
  z-index: 1;
  border-top: 1px solid var(--color-line);
  padding: 2rem 0 2.5rem;
}

.footer-inner {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.75rem 1.5rem;
  align-items: baseline;
}

.brand {
  margin: 0;
  font-family: var(--font-display);
  font-weight: 800;
  letter-spacing: 0.04em;
}

.copy {
  margin: 0;
  color: var(--color-muted);
  font-size: 0.95rem;
}
</style>
