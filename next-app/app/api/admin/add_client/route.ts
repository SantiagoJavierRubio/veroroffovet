import { prisma } from '@/prisma/client'
import { NextResponse } from 'next/server'

import { isAdmin } from '../_auth/isAdmin'
import { getNoReplyTransporter } from '@/app/_lib/mail/noreply'
import { getInviteHTML } from '@/app/_lib/mail/templates/invite'
import { NO_REPLY_FROM } from '@/app/_lib/mail/constants'

export async function POST(request: Request) {
  if (!(await isAdmin()))
    return NextResponse.json('Unauthorized', { status: 401 })
  const { email } = await request.json()
  if (!email) return NextResponse.json('Missing data', { status: 400 })
  await prisma.user.create({
    data: {
      email
    }
  })
  const transporter = getNoReplyTransporter()
  await transporter
    .sendMail({
      from: NO_REPLY_FROM,
      to: email,
      subject: 'Te invito a mi portal - Verónica Roffo, Nutrivet',
      html: getInviteHTML()
    })
    .then(res => {
      console.log(res)
    })
    .catch(err => console.error(err))
  return NextResponse.json('Done', { status: 201 })
}
