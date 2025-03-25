import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

import { AddTransactionButton } from '../_components/add-transaction-button'
import { db } from '../_lib/prisma'
import { MainArea } from './_components/main-area'

export default async function TransactionsPage() {
  const { userId } = await auth()

  if (!userId) {
    return redirect('/login')
  }

  const categories = await db.category.findMany({ where: { userId } })

  return (
    <div className="space-y-6 px-6">
      <div className="mt-5 flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Transações</h1>

        <div className="flex gap-5">
          <AddTransactionButton categories={categories} />
        </div>
      </div>

      <MainArea />
    </div>
  )
}
