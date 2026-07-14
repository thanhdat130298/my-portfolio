import type { MaybeRefOrGetter } from 'vue'

export function useReveal(target: MaybeRefOrGetter<HTMLElement | null>) {
  const el = computed(() => toValue(target))

  onMounted(() => {
    const node = el.value
    if (!node) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      node.classList.add('is-visible')
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          node.classList.add('is-visible')
          observer.disconnect()
        }
      },
      { threshold: 0.16, rootMargin: '0px 0px -8% 0px' },
    )

    observer.observe(node)
    onBeforeUnmount(() => observer.disconnect())
  })
}
