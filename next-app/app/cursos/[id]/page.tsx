import { prisma } from '@/prisma/client'

export default async function Course({ params }: { params: { id: string } }) {
  const { id } = params
  const course = await prisma.course.findUniqueOrThrow({ where: { id } })
  return <div>Course</div>
}
