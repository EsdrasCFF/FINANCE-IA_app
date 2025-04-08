import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

import { canUserAddTransaction } from '../_features/subscription/actions/can-user-add-transaction'
import { db } from '../_lib/prisma'
import { FinanceOverview } from './_components/finance-overview'

export default async function Home() {
  const { userId } = await auth()

  if (!userId) {
    return redirect('/login')
  }

  const categories = await db.category.findMany({ where: { userId } })
  const userAddTransaction = await canUserAddTransaction()

  return (
    <div className="flex h-full w-full px-6">
      <FinanceOverview categories={categories} userCanAddTransaction={userAddTransaction} />
    </div>
  )
}
