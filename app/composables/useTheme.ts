export type ThemeMode = 'light' | 'dark'

const STORAGE_KEY = 'portfolio-theme'

export function useTheme() {
  const theme = useState<ThemeMode>('portfolio-theme', () => 'light')

  function apply(mode: ThemeMode) {
    theme.value = mode
    if (import.meta.client) {
      document.documentElement.setAttribute('data-theme', mode)
      localStorage.setItem(STORAGE_KEY, mode)
    }
  }

  function toggleTheme() {
    apply(theme.value === 'light' ? 'dark' : 'light')
  }

  function initTheme() {
    if (!import.meta.client) return
    const stored = localStorage.getItem(STORAGE_KEY) as ThemeMode | null
    if (stored === 'light' || stored === 'dark') {
      apply(stored)
      return
    }
    apply('light')
  }

  return {
    theme: readonly(theme),
    isDark: computed(() => theme.value === 'dark'),
    apply,
    toggleTheme,
    initTheme,
  }
}
