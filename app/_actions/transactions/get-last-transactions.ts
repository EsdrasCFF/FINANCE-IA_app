'use server'

import { auth } from '@clerk/nextjs/server'

import { db } from '@/app/_lib/prisma'
import { convertFromHundredUnitsToAmount } from '@/app/_lib/utils'

export async function getLastTransactions() {
  const { userId } = await auth()

  if (!userId) {
    throw new Error('Unauthenticated')
  }

  const transactions = await db.transaction.findMany({
    where: {
      userId,
    },
    orderBy: {
      date: 'desc',
    },
    take: 12,
  })

  const convertAmount = transactions.map((transaction) => ({
    ...transaction,
    amount: convertFromHundredUnitsToAmount(transaction.amount),
  }))

  return convertAmount
}
