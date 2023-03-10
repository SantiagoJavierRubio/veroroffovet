import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

type UpdatesInput = [string, number][]

function checkUpdates(updates: [any, any][]): updates is UpdatesInput {
  let ok = true
  for (const [key, val] of updates) {
    if (typeof key !== 'string' || typeof val !== 'number') {
      ok = false
      break
    }
  }
  return ok
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient()
  try {
    const updates = req.body
    if (!checkUpdates(updates)) {
      return res.status(400).send('Invalid data')
    }
    const updatedPrices = await prisma.$transaction(
      updates.map(([title, value]) =>
        prisma.price.update({
          where: {
            title
          },
          data: {
            value
          }
        })
      )
    )
    res.revalidate('/asesorias')
    return res.send(updatedPrices)
  } catch (err) {
    res.status(500).send(err)
  } finally {
    prisma.$disconnect()
  }
}
