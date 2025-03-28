/* eslint-disable @typescript-eslint/no-empty-object-type */

'use server'

import { db } from '@/app/_lib/prisma'
import { convertFromAmountToHundredUnits } from '@/app/_lib/utils'
import { EditTransactionFormData } from '@/app/_validation/transactions/edit-transaction-validator'

export async function editTransaction(
  data: EditTransactionFormData,
  transactionId: string,
  userId: string
) {
  const { amount, category, ...otherProps } = data

  const updatedTransaction = await db.transaction.update({
    data: {
      ...otherProps,
      categoryId: category,
      amount: convertFromAmountToHundredUnits(amount),
    },
    where: {
      id: transactionId,
      userId,
    },
  })

  return updatedTransaction
}
