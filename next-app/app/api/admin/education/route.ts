import { revalidatePath } from 'next/cache'

import { prisma } from '@/prisma/client'
import { EducationInput } from '@/app/_queries/admin/education'
import { NextResponse } from 'next/server'

import { isAdmin } from '../_auth/isAdmin'

export async function POST(request: Request) {
  if (!(await isAdmin()))
    return NextResponse.json('Unauthorized', { status: 401 })
  const data = (await request.json()) as EducationInput[]
  const newEds = await prisma.$transaction(
    data.map(ed =>
      prisma.education.upsert({
        where: {
          id: ed.id ?? ''
        },
        update: {
          type: ed.type,
          title: ed.title,
          institution: ed.institution,
          inCourse: ed.inCourse
        },
        create: {
          type: ed.type,
          title: ed.title,
          institution: ed.institution,
          inCourse: ed.inCourse
        }
      })
    )
  )
  revalidatePath('/about')
  return NextResponse.json(newEds)
}

export async function GET() {
  const education = await prisma.education.findMany()
  return NextResponse.json(education)
}

export async function DELETE(request: Request) {
  if (!(await isAdmin()))
    return NextResponse.json('Unauthorized', { status: 401 })
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  if (id == undefined) throw new Error('ID required')

  const del = await prisma.education.delete({
    where: { id: id.toString() }
  })

  return NextResponse.json(del)
}
