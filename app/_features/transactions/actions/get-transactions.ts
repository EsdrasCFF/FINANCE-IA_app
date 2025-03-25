'use server'
import { parse, startOfDay } from 'date-fns'

import { db } from '@/app/_lib/prisma'
import { convertFromHundredUnitsToAmount } from '@/app/_lib/utils'

interface Props {
  firstDay: string
  lastDay: string
}

export async function getTransactions(period: Props, userId: string) {
  const firstDay = startOfDay(parse(period.firstDay, 'yyyy-MM-dd', new Date()))
  const lastDay = startOfDay(parse(period.lastDay, 'yyyy-MM-dd', new Date()))

  const transactions = await db.transaction.findMany({
    where: {
      userId,
      date: {
        gte: firstDay,
        lte: lastDay,
      },
    },
    orderBy: {
      date: 'desc',
    },
    include: {
      category: {
        select: {
          name: true,
        },
      },
    },
  })

  const transactionsWithCategory = transactions.map((transaction) => {
    const { category, amount, ...otherProps } = transaction

    return {
      ...otherProps,
      category: category?.name || null,
      amount: convertFromHundredUnitsToAmount(Number(amount)),
    }
  })

  return transactionsWithCategory
}
