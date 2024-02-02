import { prisma } from '@/prisma/client'
import { NextResponse } from 'next/server'

import { isAdmin } from '../_auth/isAdmin'

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
  return NextResponse.json('Done', { status: 201 })
}
