import { prisma } from '@/prisma/client'
import { NextResponse } from 'next/server'

export async function GET() {
  const courses = await prisma.course.findMany({
    where: {
      enabled: true
    }
  })
  NextResponse.json(courses)
}
