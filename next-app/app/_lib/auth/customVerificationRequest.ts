import type { SendVerificationRequestParams } from 'next-auth/providers'
import { getNoReplyTransporter } from '../mail/noreply'
import { NO_REPLY_FROM } from '../mail/constants'
import { getLoginHTML } from '../mail/templates/login'

export async function customVerificationRequests(
  params: SendVerificationRequestParams
) {
  const { identifier, url } = params
  const transporter = getNoReplyTransporter()
  const result = await transporter.sendMail({
    to: identifier,
    subject: 'Inicia sesión - Portal Nutrivet',
    from: NO_REPLY_FROM,
    text: `Inicia sesión al Portal Nutriver\n${url}\n\n`,
    html: getLoginHTML(url)
  })
  const failed = result.rejected.concat(result.pending).filter(Boolean)
  if (failed.length) {
    throw new Error(`Email(s) (${failed.join(', ')}) could not be sent`)
  }
}
