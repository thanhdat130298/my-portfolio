import { getClientIp } from '../utils/requestIp'
import { banIp, isIpBanned } from '../utils/quota'
import { ABUSE_REFUSAL } from '../../shared/chatGuards'

/** POST /api/chat-ban — lock this IP out of free-form chat for the day. */
export default defineEventHandler(async (event) => {
  const ip = getClientIp(event)

  if (await isIpBanned(ip)) {
    const quota = await banIp(ip, 'abuse')
    return {
      ok: true,
      alreadyBanned: true,
      reply: ABUSE_REFUSAL,
      chatLocked: true,
      quota,
    }
  }

  const quota = await banIp(ip, 'abuse')
  return {
    ok: true,
    alreadyBanned: false,
    reply: ABUSE_REFUSAL,
    chatLocked: true,
    quota,
  }
})
