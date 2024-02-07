import { NextRequest, NextResponse } from 'next/server'
import { isAdmin } from '../../_auth/isAdmin'
import { prisma } from '@/prisma/client'
import { UpsertCourseInput } from '@/app/_lib/schemas/course'
import { revalidatePath } from 'next/cache'

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
  const course = await prisma.course.update({
    where: { id: data.id },
    data
  })
  revalidatePath('/cursos')
  return NextResponse.json(course)
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!(await isAdmin()))
    return NextResponse.json('Unauthorized', { status: 401 })
  const id = params.id
  const del = await prisma.course.delete({ where: { id } })
  revalidatePath('/cursos')
  return NextResponse.json(del)
}
