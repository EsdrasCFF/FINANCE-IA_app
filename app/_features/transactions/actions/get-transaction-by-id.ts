'use server'

import { db } from '@/app/_lib/prisma'

export async function getTransactionById(transactionId: string, userId: string) {
  const transaction = await db.transaction.findUnique({
    where: {
      id: transactionId,
      userId,
    },
  })

  return {
    ...transaction,
  }
}
