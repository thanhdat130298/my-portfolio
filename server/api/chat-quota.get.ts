import { getClientIp } from '../utils/requestIp'
import { getQuotaStatus } from '../utils/quota'

export default defineEventHandler(async (event) => {
  const ip = getClientIp(event)
  return await getQuotaStatus(ip)
})
