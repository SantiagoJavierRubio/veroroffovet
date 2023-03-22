import type { NextApiRequest, NextApiResponse } from 'next'
import { Curso, PrismaClient } from '@prisma/client'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient()
  try {
    const data = req.body as Curso[]
    const newCourses = await prisma.$transaction(
      data.map(course =>
        prisma.curso.upsert({
          where: {
            id: course.id
          },
          update: course,
          create: {
            type: course.type,
            title: course.title,
            institution: course.institution,
            inCourse: course.inCourse
          }
        })
      )
    )
    await res.revalidate('/about')
    return res.send(newCourses)
  } catch (err) {
    res.status(500).send(err)
  } finally {
    prisma.$disconnect()
  }
}
