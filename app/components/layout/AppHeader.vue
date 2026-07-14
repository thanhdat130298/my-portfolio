<script setup lang="ts">
const { t, locale, setLocale } = useI18n()
const { brand, nav } = useLocalizedPortfolio()
const { isDark, toggleTheme } = useTheme()

const open = ref(false)
const scrolled = ref(false)

function onScroll() {
  scrolled.value = window.scrollY > 12
}

function closeNav() {
  open.value = false
}

async function switchLocale(code: 'en' | 'vi') {
  await setLocale(code)
  if (import.meta.client) {
    document.documentElement.setAttribute('lang', code === 'vi' ? 'vi' : 'en')
  }
  closeNav()
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  document.documentElement.setAttribute('lang', locale.value === 'vi' ? 'vi' : 'en')
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})

useHead(() => ({
  title: t('meta.title'),
  meta: [{ name: 'description', content: t('meta.description') }],
  htmlAttrs: {
    lang: locale.value === 'vi' ? 'vi' : 'en',
    'data-theme': isDark.value ? 'dark' : 'light',
  },
}))
</script>

<template>
  <header class="header" :class="{ 'is-scrolled': scrolled }">
    <div class="container header-inner">
      <a class="brand text-gradient" href="#top" @click="closeNav">{{ brand }}</a>

      <nav id="site-nav" class="nav" :class="{ 'is-open': open }">
        <a
          v-for="link in nav"
          :key="link.href"
          :href="link.href"
          @click="closeNav"
        >
          {{ link.label }}
        </a>
        <a class="btn btn-primary nav-cta mobile-only" href="#contact" @click="closeNav">
          {{ t('ui.contactMe') }}
        </a>
      </nav>

      <div class="aside">
        <div class="prefs" role="group" :aria-label="t('ui.switchLanguage')">
          <button
            type="button"
            class="pref-btn"
            :class="{ 'is-active': locale === 'en' }"
            :aria-pressed="locale === 'en'"
            @click="switchLocale('en')"
          >
            {{ t('ui.langEn') }}
          </button>
          <button
            type="button"
            class="pref-btn"
            :class="{ 'is-active': locale === 'vi' }"
            :aria-pressed="locale === 'vi'"
            @click="switchLocale('vi')"
          >
            {{ t('ui.langVi') }}
          </button>
        </div>
        <button
          type="button"
          class="prefs theme-toggle"
          :aria-label="t('ui.toggleTheme')"
          :aria-pressed="isDark"
          @click="toggleTheme"
        >
          <span class="pref-btn is-active">{{ isDark ? t('ui.themeLight') : t('ui.themeDark') }}</span>
        </button>
        <a class="btn btn-primary nav-cta desktop-only" href="#contact">{{ t('ui.contactMe') }}</a>
        <button
          class="menu-toggle"
          type="button"
          :aria-expanded="open"
          aria-controls="site-nav"
          :aria-label="t('ui.toggleNav')"
          @click="open = !open"
        >
          <span />
          <span />
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: fixed;
  inset: 0 0 auto;
  z-index: 40;
  height: var(--header-h);
  display: flex;
  align-items: center;
  transition: background 0.3s ease, box-shadow 0.3s ease, backdrop-filter 0.3s ease;
}

.header.is-scrolled {
  background: var(--color-header-bg);
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 20px rgba(24, 24, 27, 0.08);
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.25rem;
  width: 100%;
}

.brand {
  font-family: var(--font-display);
  font-weight: 800;
  letter-spacing: 0.04em;
  font-size: 1.15rem;
  flex-shrink: 0;
}

.nav {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.nav a:not(.btn) {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-ink-soft);
  transition: color 0.2s ease;
}

.nav a:not(.btn):hover {
  color: var(--color-accent);
}

.nav-cta {
  min-height: 2.4rem;
  padding: 0.45rem 1.1rem;
  font-size: 0.88rem;
}

.aside {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
}

.prefs {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.2rem;
  border: 1px solid var(--color-line);
  border-radius: var(--radius-sm);
  background: var(--color-surface-elevated);
}

.pref-btn {
  border: 0;
  background: transparent;
  color: var(--color-muted);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  padding: 0.35rem 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;
}

.pref-btn:hover,
.pref-btn.is-active {
  color: var(--color-ink);
  background: var(--color-accent-soft);
}

.theme-toggle {
  cursor: pointer;
  padding: 0.2rem;
}

.theme-toggle .pref-btn {
  pointer-events: none;
  min-width: 3.1rem;
  text-align: center;
}

.mobile-only {
  display: none;
}

.menu-toggle {
  display: none;
  width: 2.5rem;
  height: 2.5rem;
  border: 0;
  background: transparent;
  padding: 0.55rem;
  cursor: pointer;
}

.menu-toggle span {
  display: block;
  height: 2px;
  margin: 6px 0;
  background: var(--color-ink);
  transition: transform 0.2s ease;
}

@media (max-width: 900px) {
  .desktop-only {
    display: none;
  }

  .mobile-only {
    display: inline-flex;
    margin-top: 0.5rem;
    width: fit-content;
  }

  .menu-toggle {
    display: block;
  }

  .nav {
    position: absolute;
    top: var(--header-h);
    left: 0;
    right: 0;
    flex-direction: column;
    align-items: flex-start;
    gap: 0;
    padding: 0.75rem var(--container-pad) 1.25rem;
    background: var(--color-nav-bg);
    border-bottom: 1px solid var(--color-line);
    transform: translateY(-120%);
    opacity: 0;
    pointer-events: none;
    transition: transform 0.25s ease, opacity 0.25s ease;
  }

  .nav.is-open {
    transform: translateY(0);
    opacity: 1;
    pointer-events: auto;
  }

  .nav a:not(.btn) {
    width: 100%;
    padding: 0.85rem 0;
    border-bottom: 1px solid var(--color-line);
  }
}

@media (max-width: 480px) {
  .prefs {
    gap: 0.1rem;
  }

  .pref-btn {
    padding: 0.3rem 0.4rem;
    font-size: 0.68rem;
  }
}
</style>
