import { ArrowDownUp } from 'lucide-react'

import { Button } from '../_components/ui/button'
import { DataTable } from '../_components/ui/data-table'
import { db } from '../_lib/prisma'
import { transactionsColumns } from './_columns'

export default async function TransactionsPage() {
  const transactionsWithCategory = await db.transaction.findMany({
    include: {
      category: {
        select: {
          name: true,
        },
      },
    },
  })

  const transactions = transactionsWithCategory.map((transaction) => {
    return {
      ...transaction,
      category: transaction.category?.name || null,
    }
  })

  return (
    <div className="space-y-6 px-6">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Transações</h1>
        <Button className="rounded-full text-sm font-bold">
          Adicionar Transação <ArrowDownUp className="ml-1" />
        </Button>
      </div>

      <DataTable columns={transactionsColumns} data={transactions} />
    </div>
  )
}
