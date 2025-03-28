'use server'

import { db } from '@/app/_lib/prisma'

export async function deleteTransaction(transactionId: string, userId: string) {
  const deletedTransaction = await db.transaction.delete({
    where: {
      id: transactionId,
      userId,
    },
  })

  console.log({ deleteTransaction })

  return deletedTransaction
}
