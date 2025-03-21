'use server'

import { auth } from '@clerk/nextjs/server'
import { Prisma, TransactionType } from '@prisma/client'

import { db } from '@/app/_lib/prisma'
import { convertFromHundredUnitsToAmount } from '@/app/_lib/utils'

export async function getSummary(month: { firstDay: string; lastDay: string }) {
  const { userId } = await auth()

  if (!userId) {
    throw new Error('Unauthorized')
  }

  const query = Prisma.sql`
    SELECT type, SUM(COALESCE(amount, 0)) as total
    FROM "transactions"
    WHERE "user_id" = ${userId}
    AND "date" BETWEEN ${month.firstDay}::timestamp AND ${month.lastDay}::timestamp
    GROUP BY type
  `

  const result = await db.$queryRaw<{ type: TransactionType; total: number }[]>(query)

  const summary = {
    DEPOSIT: 0,
    EXPENSE: 0,
    INVESTMENT: 0,
  }

  result.forEach((value) => {
    summary[value.type] = convertFromHundredUnitsToAmount(Number(value.total))
  })

  return summary
}
