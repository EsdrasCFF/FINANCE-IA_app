import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

import { AddTransactionButton } from '../_components/add-transaction-button'
import { NavBar } from '../_components/nav-bar'
import { DataTable } from '../_components/ui/data-table'
import { db } from '../_lib/prisma'
import { transactionsColumns } from './_columns'

export default async function TransactionsPage() {
  const { userId } = await auth()

  if (!userId) {
    return redirect('/login')
  }

  const transactionsWithCategory = await db.transaction.findMany({
    include: {
      category: {
        select: {
          name: true,
        },
      },
    },
    where: {
      userId,
    },
  })

  const transactions = transactionsWithCategory.map((transaction) => {
    return {
      ...transaction,
      category: transaction.category?.name || null,
    }
  })

  const categories = await db.category.findMany({ where: { userId } })

  return (
    <>
      <NavBar />

      <div className="space-y-6 px-6">
        <div className="mt-5 flex w-full items-center justify-between">
          <h1 className="text-2xl font-bold">Transações</h1>
          <AddTransactionButton categories={categories} />
        </div>

        <DataTable columns={transactionsColumns} data={transactions} />
      </div>
    </>
  )
}
