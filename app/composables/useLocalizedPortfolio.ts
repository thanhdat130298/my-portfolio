import type { ExperienceItem, ProjectItem } from '~/data/portfolio'
import { portfolio } from '~/data/portfolio'

export function useLocalizedPortfolio() {
  const { t, tm, rt } = useI18n()

  const nav = computed(() => [
    { label: t('nav.projects'), href: '#projects' },
    { label: t('nav.personal'), href: '#personal' },
    { label: t('nav.about'), href: '#about' },
    { label: t('nav.skills'), href: '#skills' },
    { label: t('nav.career'), href: '#career' },
    { label: t('nav.meetDat'), href: '#meet-dat' },
    { label: t('nav.contact'), href: '#contact' },
  ])

  const stats = computed(() => [
    { value: '10+', label: t('hero.stats.projects') },
    { value: '4', label: t('hero.stats.companies') },
    { value: '5+', label: t('hero.stats.years') },
  ])

  const aboutPoints = computed(() => [
    {
      title: t('sections.about.points.objective.title'),
      text: t('sections.about.points.objective.text'),
    },
    {
      title: t('sections.about.points.mission.title'),
      text: t('sections.about.points.mission.text'),
    },
    {
      title: t('sections.about.points.approach.title'),
      text: t('sections.about.points.approach.text'),
    },
  ])

  const languages = computed(() => [
    { name: t('sections.skills.langVi'), level: t('sections.skills.langViLevel') },
    { name: t('sections.skills.langEn'), level: t('sections.skills.langEnLevel') },
  ])

  const projects = computed<ProjectItem[]>(() =>
    portfolio.projects.map(project => ({
      ...project,
      period: t(`projects.${project.id}.period`),
      description: t(`projects.${project.id}.description`),
      highlights: resolveMessageList(tm(`projects.${project.id}.highlights`), rt, project.highlights),
    })),
  )

  const personalProjects = computed(() => {
    const catalog = tm('personalProjects.items') as Record<string, Record<string, unknown>>
    return portfolio.personalProjects.map((project) => {
      const entry = catalog?.[project.id]
      return {
        ...project,
        name: resolveLocaleField(entry?.name, rt, project.name),
        idea: resolveLocaleField(entry?.idea, rt, ''),
        note: project.hasNote
          ? resolveLocaleField(entry?.note, rt, '')
          : '',
      }
    })
  })

  const experience = computed<ExperienceItem[]>(() =>
    portfolio.experience.map((item) => {
      const localProjects = resolveProjectList(tm(`experience.${item.id}.projects`), rt)
      return {
        ...item,
        role: t(`experience.${item.id}.role`),
        period: t(`experience.${item.id}.period`),
        achievements: resolveMessageList(
          tm(`experience.${item.id}.achievements`),
          rt,
          item.achievements,
        ),
        projects: item.projects.map((pr, index) => {
          const localized = localProjects[index]
          return {
            ...pr,
            period: localized?.period || pr.period,
            summary: localized?.summary || pr.summary,
          }
        }),
      }
    }),
  )

  return {
    brand: portfolio.brand,
    name: portfolio.name,
    contact: portfolio.contact,
    skillsFrontendItems: portfolio.skillsFrontend.items,
    skillsBackendItems: portfolio.skillsBackend.items,
    nav,
    stats,
    aboutPoints,
    languages,
    projects,
    personalProjects,
    experience,
  }
}

type ResolveFn = (message: unknown) => string

function resolveLocaleField(
  value: unknown,
  resolve: ResolveFn,
  fallback: string,
): string {
  if (typeof value === 'string') return value
  if (value == null) return fallback
  try {
    return resolve(value) || fallback
  }
  catch {
    return fallback
  }
}

function resolveMessageList(
  raw: unknown,
  resolve: ResolveFn,
  fallback: string[] = [],
): string[] {
  if (!Array.isArray(raw) || !raw.length) return fallback
  return raw.map((item) => {
    if (typeof item === 'string') return item
    try {
      return resolve(item)
    }
    catch {
      return ''
    }
  }).filter(Boolean)
}

function resolveProjectList(
  raw: unknown,
  resolve: ResolveFn,
): { period?: string, summary?: string }[] {
  if (!Array.isArray(raw)) return []
  return raw.map((item) => {
    if (!item || typeof item !== 'object') return {}
    const row = item as Record<string, unknown>
    return {
      period: typeof row.period === 'string'
        ? row.period
        : row.period != null
          ? resolve(row.period)
          : undefined,
      summary: typeof row.summary === 'string'
        ? row.summary
        : row.summary != null
          ? resolve(row.summary)
          : undefined,
    }
  })
}
