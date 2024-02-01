import { revalidatePath } from 'next/cache'
import { Price } from '@prisma/client'

import { prisma } from '@/prisma/client'
import { NextResponse } from 'next/server'

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

export async function POST(request: Request) {
  const body = await request.json()
  const input = Object.entries(body)
  if (!checkUpdates(input)) {
    return NextResponse.json('Invalid data', { status: 400 })
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
  revalidatePath('/asesorias')
  return NextResponse.json(updatedPrices)
}
export async function GET() {
  const prices = await prisma.price.findMany()
  return NextResponse.json(parsePriceListToObject(prices))
}
