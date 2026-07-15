import type { H3Event } from 'h3'

function normalizeOrigin(value: string): string {
  return value.trim().replace(/\/$/, '')
}

function parseOrigins(raw: unknown): string[] {
  if (typeof raw !== 'string' || !raw.trim()) return []
  return raw.split(',').map(normalizeOrigin).filter(Boolean)
}

function originFromUrl(value: string | undefined): string | null {
  if (!value) return null
  try {
    return normalizeOrigin(new URL(value).origin)
  }
  catch {
    return null
  }
}

/** Runtime env + runtimeConfig (Nuxt only auto-overrides with NUXT_*). */
function collectAllowedOrigins(event: H3Event): Set<string> {
  const config = useRuntimeConfig(event)
  const allowed = new Set<string>([
    ...parseOrigins(config.allowedOrigins),
    ...parseOrigins(process.env.NUXT_ALLOWED_ORIGINS),
    ...parseOrigins(process.env.ALLOWED_ORIGINS),
    ...parseOrigins(process.env.NUXT_PUBLIC_SITE_URL),
  ])

  const vercelUrl = process.env.VERCEL_URL?.trim()
  if (vercelUrl) {
    allowed.add(normalizeOrigin(`https://${vercelUrl}`))
  }

  // Always allow this deployment's own host (fixes missing/stale allowlist env).
  try {
    allowed.add(normalizeOrigin(getRequestURL(event).origin))
  }
  catch {
    // ignore
  }

  if (import.meta.dev) {
    allowed.add('http://localhost:3000')
    allowed.add('http://127.0.0.1:3000')
  }

  return allowed
}

/** Reject requests whose Origin/Referer is missing or not on the allowlist. */
export function assertAllowedOrigin(event: H3Event): void {
  const requestOrigin =
    originFromUrl(getHeader(event, 'origin'))
    || originFromUrl(getHeader(event, 'referer'))

  if (!requestOrigin) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Forbidden',
    })
  }

  const allowed = collectAllowedOrigins(event)
  if (!allowed.has(requestOrigin)) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Forbidden',
    })
  }
}
