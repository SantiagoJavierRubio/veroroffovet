import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

import { Barrio } from '@prisma/client'
import { prisma } from '@/prisma/client'

type UpdateBarriosInput = {
  new: Barrio[]
  delete: string[]
}

export async function POST(request: Request) {
  const input: UpdateBarriosInput = await request.json()
  const barrios = await prisma.$transaction([
    ...input.new.map(data =>
      prisma.barrio.create({
        data: {
          ...data,
          name: data.name.toUpperCase()
        }
      })
    ),
    prisma.barrio.deleteMany({ where: { name: { in: input.delete } } })
  ])
  revalidatePath('/domicilio')
  return NextResponse.json(barrios)
}

export async function GET() {
  const barrios = await prisma.barrio.findMany({
    orderBy: {
      distritoName: 'asc'
    }
  })
  return NextResponse.json(barrios)
}
