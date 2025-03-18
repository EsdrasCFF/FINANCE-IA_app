'use server'

import { auth } from '@clerk/nextjs/server'
import { PaymentMethod, TransactionType } from '@prisma/client'
import { revalidatePath } from 'next/cache'

import { db } from '@/app/_lib/prisma'
import { convertFromAmountToHundredUnits } from '@/app/_lib/utils'

export interface CreateTransactionProps {
  name: string
  amount: number
  type: TransactionType
  category: string
  paymentMethod: PaymentMethod
  date: Date
}

export async function addTransaction(params: CreateTransactionProps) {
  const { userId } = await auth()

  if (!userId) {
    throw new Error('Unauthorized')
  }

  const amount = convertFromAmountToHundredUnits(params.amount)

  const { category, ...otherParams } = params

  await db.transaction.create({
    data: {
      ...otherParams,
      amount,
      categoryId: category,
      userId,
    },
  })

  revalidatePath('/transactions')
}
