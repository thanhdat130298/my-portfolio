<script setup lang="ts">
const { t } = useI18n()
const showTop = ref(false)
const nearChat = ref(false)

function onScroll() {
  const y = window.scrollY || document.documentElement.scrollTop
  showTop.value = y > 420

  const chat = document.getElementById('meet-dat')
  if (!chat) {
    nearChat.value = false
    return
  }
  const rect = chat.getBoundingClientRect()
  nearChat.value = rect.top < window.innerHeight * 0.65 && rect.bottom > 80
}

function scrollToChat() {
  document.getElementById('meet-dat')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <div class="fabs" aria-label="Quick navigation">
    <button
      v-show="!nearChat"
      class="fab chat bounce"
      type="button"
      :aria-label="t('ui.scrollToChat')"
      :title="t('ui.scrollToChat')"
      @click="scrollToChat"
    >
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
        <path
          fill="currentColor"
          d="M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Zm0 14H5.17L4 17.17V4h16Z"
        />
      </svg>
    </button>

    <button
      v-show="showTop"
      class="fab top"
      type="button"
      :aria-label="t('ui.scrollToTop')"
      :title="t('ui.scrollToTop')"
      @click="scrollToTop"
    >
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
        <path fill="currentColor" d="M12 4 4 12h5v8h6v-8h5Z" />
      </svg>
    </button>
  </div>
</template>

<style scoped>
.fabs {
  position: fixed;
  right: max(1rem, env(safe-area-inset-right));
  bottom: max(1.15rem, env(safe-area-inset-bottom));
  z-index: 45;
  display: grid;
  gap: 0.65rem;
  justify-items: end;
}

.fab {
  width: 3.15rem;
  height: 3.15rem;
  border: 0;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #fff;
  background: var(--gradient-brand);
  box-shadow: var(--shadow-soft);
  transition: transform 0.2s ease, filter 0.2s ease;
}

.fab:hover {
  filter: brightness(1.05);
  transform: translateY(-2px);
}

.fab.top {
  background: var(--color-surface-elevated);
  color: var(--color-ink);
  border: 1px solid var(--color-line);
}

.fab.chat.bounce {
  animation: fab-bounce 1.8s ease-in-out infinite;
}

@keyframes fab-bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  45% {
    transform: translateY(-0.45rem);
  }
  60% {
    transform: translateY(-0.15rem);
  }
}

@media (prefers-reduced-motion: reduce) {
  .fab.chat.bounce {
    animation: none;
  }
}
</style>
