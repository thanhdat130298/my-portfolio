export function getClientIp(event: Parameters<typeof getRequestIP>[0]): string {
  const ip =
    getRequestIP(event, { xForwardedFor: true })
    || getHeader(event, 'x-real-ip')
    || getHeader(event, 'cf-connecting-ip')
    || 'unknown'
  return String(ip).split(',')[0]?.trim() || 'unknown'
}
