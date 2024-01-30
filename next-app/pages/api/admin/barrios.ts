import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/prisma/client'
import { Barrio } from '@prisma/client'

type UpdateBarriosInput = {
  new: Barrio[]
  delete: string[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'POST') {
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
    } else {
      const barrios = await prisma.barrio.findMany({
        orderBy: {
          distritoName: 'asc'
        }
      })
      res.send(barrios)
    }
  } catch (err) {
    console.error(err)
    res.status(500).send(err)
  }
}
