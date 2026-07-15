import { getClientIp } from '../utils/requestIp'
import { assertAllowedOrigin } from '../utils/originAllowlist'
import { getQuotaStatus } from '../utils/quota'

export default defineEventHandler(async (event) => {
  assertAllowedOrigin(event)

  const ip = getClientIp(event)
  return await getQuotaStatus(ip)
})
