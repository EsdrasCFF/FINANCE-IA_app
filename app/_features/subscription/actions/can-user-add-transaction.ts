'use server'

import { auth, clerkClient } from '@clerk/nextjs/server'

import { getTransactionsQuantity } from './get-transactions-count'

export async function canUserAddTransaction() {
  const { userId } = await auth()

  if (!userId) {
    throw new Error('Unauthorized')
  }

  const user = await (await clerkClient()).users.getUser(userId)

  if (user.publicMetadata.subscriptionPlan == 'premium') {
    return true
  }

  const currentMonthTransactions = await getTransactionsQuantity()
  if (currentMonthTransactions >= 20) {
    return false
  }

  return true
}
