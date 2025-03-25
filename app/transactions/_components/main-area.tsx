/* eslint-disable @typescript-eslint/no-unused-vars  */

'use client'

import { Category } from '@prisma/client'
import { useQueryState } from 'nuqs'

import { AddTransactionButton } from '@/app/_components/add-transaction-button'
import { DataTable } from '@/app/_components/ui/data-table'
import { useGetTransactions } from '@/app/_features/transactions/api/use-get-transactions'
import { TimeSelect } from '@/app/(dashboard)/_components/time-select'

import { transactionsColumns } from '../_columns'

interface Props {
  categories: Category[]
}

export function MainArea({ categories }: Props) {
  const [month, setMonth] = useQueryState('month')

  const getTransactionsQuery = useGetTransactions(month)

  const transactions = getTransactionsQuery.data?.transactions || []

  const isLoading = getTransactionsQuery.isLoading

  return (
    <main className="mb-6 flex h-full w-full flex-col gap-6">
      <div className="mt-5 flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Transações</h1>

        <div className="flex gap-5">
          <AddTransactionButton categories={categories} />
          <TimeSelect month={month} setMonth={setMonth} />
        </div>
      </div>

      <DataTable columns={transactionsColumns} data={transactions} isLoading={isLoading} />
    </main>
  )
}
