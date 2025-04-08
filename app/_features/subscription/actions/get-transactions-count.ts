'use server'

import { auth } from '@clerk/nextjs/server'
import { endOfMonth, startOfMonth } from 'date-fns'
import { redirect } from 'next/navigation'

import { db } from '@/app/_lib/prisma'

export async function getTransactionsQuantity() {
  const { userId } = await auth()

  if (!userId) {
    return redirect('/login')
  }

  const quantity = await db.transaction.count({
    where: {
      createdAt: {
        gte: startOfMonth(new Date()),
        lte: endOfMonth(new Date()),
      },
    },
  })

  return quantity
}
