'use server'

import { PaymentMethod, TransactionType } from '@prisma/client'

import { db } from '@/app/_lib/prisma'
import { convertFromAmountToHundredUnits, convertFromHundredUnitsToAmount } from '@/app/_lib/utils'

export interface CreateTransactionProps {
  name: string
  amount: number
  type: TransactionType
  category: string
  paymentMethod: PaymentMethod
  date: Date
  userId: string
}

export async function addTransaction(params: CreateTransactionProps) {
  const amount = convertFromAmountToHundredUnits(params.amount)

  const { category: categoryId, ...otherParams } = params

  const createdUser = await db.transaction.create({
    data: {
      ...otherParams,
      amount,
      categoryId: categoryId,
      userId: params.userId,
    },
    include: {
      category: {
        select: {
          name: true,
        },
      },
    },
  })

  const { category, amount: value, ...otherProps } = createdUser

  return {
    ...otherProps,
    category: category?.name || null,
    amount: convertFromHundredUnitsToAmount(value),
  }
}
