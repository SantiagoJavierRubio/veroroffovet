import { revalidatePath } from 'next/cache'

import { prisma } from '@/prisma/client'
import { CursoInput } from '@/app/admin/cursos/page'

export async function POST(request: Request) {
  const data = (await request.json()) as CursoInput[]
  const newCourses = await prisma.$transaction(
    data.map(course =>
      prisma.curso.upsert({
        where: {
          id: course.id ?? ''
        },
        update: {
          type: course.type,
          title: course.title,
          institution: course.institution,
          inCourse: course.inCourse
        },
        create: {
          type: course.type,
          title: course.title,
          institution: course.institution,
          inCourse: course.inCourse
        }
      })
    )
  )
  revalidatePath('/about')
  return Response.json(newCourses)
}

export async function GET() {
  const courses = await prisma.curso.findMany()
  return Response.json(courses)
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  if (id == undefined) throw new Error('ID required')

  const del = await prisma.curso.delete({
    where: { id: id.toString() }
  })

  return Response.json(del)
}
