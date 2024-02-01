import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/prisma/client'
import { CursoInput } from '@/pages/admin/prev_cursos'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'POST') {
      const data = req.body as CursoInput[]
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
      await res.revalidate('/about')
      return res.send(newCourses)
    } else if (req.method == 'DELETE') {
      const { id } = req.query
      if (id == undefined) throw new Error('ID required')
      const del = await prisma.curso.delete({
        where: { id: id.toString() }
      })
      res.send(del)
    } else {
      const courses = await prisma.curso.findMany()
      res.send(courses)
    }
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}
