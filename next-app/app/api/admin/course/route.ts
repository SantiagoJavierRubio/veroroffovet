import { prisma } from '@/prisma/client'
import { NextResponse } from 'next/server'
import { isAdmin } from '../_auth/isAdmin'

export async function GET() {
  if (!(await isAdmin()))
    return NextResponse.json('Unauthorized', { status: 401 })
  const courses = await prisma.course.findMany()
  NextResponse.json(courses)
}
