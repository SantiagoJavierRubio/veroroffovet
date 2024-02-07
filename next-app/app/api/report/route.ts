import { NO_REPLY_FROM } from '@/app/_lib/mail/constants'
import { getNoReplyTransporter } from '@/app/_lib/mail/noreply'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const transporter = getNoReplyTransporter()

  const { report } = await request.json()

  const htmlContent = `
          <h1>Problem report on VEROROFFOVET</h1>
          <p style="padding-left: 6px">${report}</p>
      `
  return await transporter
    .sendMail({
      from: NO_REPLY_FROM,
      to: process.env.DEV_MAIL,
      subject: 'Problem report on VEROROFFOVET',
      html: htmlContent
    })
    .then(sent => {
      if (sent.accepted) return NextResponse.json('Email sent')
      return NextResponse.json(sent.response)
    })
    .catch(err => {
      console.log(err)
      return NextResponse.json(
        { error: 'Something went wrong' },
        { status: 400 }
      )
    })
}
