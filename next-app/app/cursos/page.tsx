import { prisma } from '@/prisma/client'
import React from 'react'

export default async function Courses() {
  const courses = await prisma.course.findMany({ where: { enabled: true } })
  return <div>Courses</div>
}
