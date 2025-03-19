'use server'

import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'

import { db } from '@/app/_lib/prisma'
import { convertFromAmountToHundredUnits } from '@/app/_lib/utils'
import { EditTransactionFormSchemaData } from '@/app/transactions/_components/edit-transaction-dialog'

interface EditTransactionProps extends EditTransactionFormSchemaData {
  transactionId: string
}

export async function editTransaction({
  amount,
  category,
  date,
  name,
  paymentMethod,
  transactionId,
  type,
}: EditTransactionProps) {
  const { userId } = await auth()

  if (!userId) {
    throw new Error('Unauthorized')
  }

  const transactionExists = await db.transaction.findUnique({
    where: { id: transactionId },
  })

  if (!transactionExists) {
    throw new Error('Unauthorized')
  }

  await db.transaction.update({
    data: {
      name,
      paymentMethod,
      type,
      categoryId: category,
      date,
      amount: convertFromAmountToHundredUnits(amount),
    },
    where: {
      id: transactionExists.id,
      userId: transactionExists.userId,
    },
  })

  revalidatePath('/transactions')
}
