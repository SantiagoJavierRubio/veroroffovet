import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, Barrio } from '@prisma/client'

type UpdateBarriosInput = {
  new: Barrio[]
  delete: string[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient()
  try {
    const input: UpdateBarriosInput = req.body
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
    await res.revalidate('/clinica')
    return res.send(barrios)
  } catch (err) {
    res.status(500).send(err)
  } finally {
    prisma.$disconnect()
  }
}
