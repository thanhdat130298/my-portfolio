export const CHAT_DAILY_LIMIT = 7
export const CHAT_MAX_CHARS = 200

type MemoryRow = {
  day: string
  count: number
  name?: string
}

type BanRow = {
  day: string
  reason: string
  at: number
}

/** In-memory daily quota per IP (resets when server restarts). */
const memoryQuota = new Map<string, MemoryRow>()
/** In-memory chat bans for abusive language (day-scoped). */
const memoryBans = new Map<string, BanRow>()

function utcDay(): string {
  return new Date().toISOString().slice(0, 10)
}

function memoryKey(ip: string) {
  return `${ip}::${utcDay()}`
}

export interface QuotaStatus {
  limit: number
  used: number
  remaining: number
  limited: boolean
  banned: boolean
  day: string
}

export async function isIpBanned(ip: string): Promise<boolean> {
  const row = memoryBans.get(memoryKey(ip))
  return Boolean(row && row.day === utcDay())
}

/** Ban IP from free-form chat for the rest of the UTC day (no quota burn). */
export async function banIp(ip: string, reason = 'abuse'): Promise<QuotaStatus> {
  const day = utcDay()
  memoryBans.set(memoryKey(ip), { day, reason, at: Date.now() })
  return await getQuotaStatus(ip)
}

export async function getQuotaStatus(ip: string): Promise<QuotaStatus> {
  const day = utcDay()
  const used = memoryQuota.get(memoryKey(ip))?.count ?? 0
  const banned = await isIpBanned(ip)
  const remaining = banned ? 0 : Math.max(0, CHAT_DAILY_LIMIT - used)
  return {
    limit: CHAT_DAILY_LIMIT,
    used: banned ? CHAT_DAILY_LIMIT : used,
    remaining,
    limited: banned || used >= CHAT_DAILY_LIMIT,
    banned,
    day,
  }
}

/** Returns updated status, or null if already limited / banned. */
export async function consumeQuota(
  ip: string,
  visitorName: string,
): Promise<QuotaStatus | null> {
  const current = await getQuotaStatus(ip)
  if (current.limited || current.banned) return null

  const day = utcDay()
  const nextCount = current.used + 1
  memoryQuota.set(memoryKey(ip), {
    day,
    count: nextCount,
    name: visitorName,
  })

  return {
    limit: CHAT_DAILY_LIMIT,
    used: nextCount,
    remaining: Math.max(0, CHAT_DAILY_LIMIT - nextCount),
    limited: nextCount >= CHAT_DAILY_LIMIT,
    banned: false,
    day,
  }
}
