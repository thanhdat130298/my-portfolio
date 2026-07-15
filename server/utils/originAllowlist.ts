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
    return new URL(value).origin
  }
  catch {
    return null
  }
}

function collectAllowedOrigins(event: H3Event): Set<string> {
  const config = useRuntimeConfig(event)
  const allowed = new Set(parseOrigins(config.allowedOrigins))

  // Local Nuxt/Vite defaults for development.
  if (import.meta.dev) {
    for (const origin of [
      'http://localhost:3000',
      'http://127.0.0.1:3000',
    ]) {
      allowed.add(origin)
    }
  }

  return allowed
}

/** Reject requests whose Origin/Referer is missing or not on the allowlist. */
export function assertAllowedOrigin(event: H3Event): void {
  const allowed = collectAllowedOrigins(event)
  if (!allowed.size) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Forbidden',
    })
  }

  const requestOrigin =
    originFromUrl(getHeader(event, 'origin'))
    || originFromUrl(getHeader(event, 'referer'))

  if (!requestOrigin || !allowed.has(requestOrigin)) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Forbidden',
    })
  }
}
