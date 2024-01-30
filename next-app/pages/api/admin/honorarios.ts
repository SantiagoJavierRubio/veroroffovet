import type { NextApiRequest, NextApiResponse } from 'next'
import { Price } from '@prisma/client'
import { prisma } from '@/prisma/client'

type UpdatesInput = [string, number][]

function checkUpdates(updates: [unknown, unknown][]): updates is UpdatesInput {
  let ok = true
  for (const [key, val] of updates) {
    if (typeof key !== 'string' || typeof val !== 'number') {
      ok = false
      break
    }
  }
  return ok
}

function parsePriceListToObject(prices: Price[]) {
  return Object.fromEntries(
    prices.map(p => {
      return [p.title, p.value]
    })
  )
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'POST') {
      const input = Object.entries(req.body)
      if (!checkUpdates(input)) {
        return res.status(400).send('Invalid data')
      }
      const updatedPrices = await prisma.$transaction(
        input.map(([title, value]) =>
          prisma.price.upsert({
            where: {
              title
            },
            update: {
              value
            },
            create: {
              title,
              value
            }
          })
        )
      )
      await res.revalidate('/asesorias')
      console.log(updatedPrices)
      return res.send(updatedPrices)
    } else {
      const prices = await prisma.price.findMany()
      res.send(parsePriceListToObject(prices))
    }
  } catch (err) {
    console.error(err)
    res.status(500).send(err)
  }
}
