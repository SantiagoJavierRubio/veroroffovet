import { prisma } from '@/prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import { isAdmin } from '../_auth/isAdmin'
import { UpsertCourseInput } from '@/app/_lib/schemas/course'
import { revalidatePath } from 'next/cache'

export async function GET() {
  if (!(await isAdmin()))
    return NextResponse.json('Unauthorized', { status: 401 })
  const courses = await prisma.course.findMany()
  return NextResponse.json(courses)
}

export async function POST(request: NextRequest) {
  if (!(await isAdmin()))
    return NextResponse.json('Unauthorized', { status: 401 })
  const data: Omit<UpsertCourseInput, 'id'> = await request.json()
  const course = await prisma.course.create({
    data
  })
  revalidatePath('/cursos')
  return NextResponse.json(course)
}
