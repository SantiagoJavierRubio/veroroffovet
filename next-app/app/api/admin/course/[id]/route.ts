import { NextRequest, NextResponse } from 'next/server'
import { isAdmin } from '../../_auth/isAdmin'
import { prisma } from '@/prisma/client'
import { UpsertCourseInput } from '@/app/_lib/schemas/course'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!(await isAdmin()))
    return NextResponse.json('Unauthorized', { status: 401 })
  const id = params.id
  const course = await prisma.course.findUniqueOrThrow({ where: { id } })
  return NextResponse.json(course)
}

export async function POST(request: NextRequest) {
  if (!(await isAdmin()))
    return NextResponse.json('Unauthorized', { status: 401 })
  const data: UpsertCourseInput = await request.json()
  const course = await prisma.course.upsert({
    where: { id: data.id },
    update: data,
    create: data
  })
  return NextResponse.json(course)
}

export async function DELETE(request: NextRequest) {
  if (!(await isAdmin()))
    return NextResponse.json('Unauthorized', { status: 401 })
  const { id } = await request.json()
  const del = await prisma.course.delete({ where: { id } })
  return NextResponse.json(del)
}
