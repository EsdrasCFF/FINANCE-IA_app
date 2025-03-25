/* eslint-disable @typescript-eslint/no-unused-vars  */

'use client'

import { useQueryState } from 'nuqs'

import { DataTable } from '@/app/_components/ui/data-table'
import { useGetTransactions } from '@/app/_features/transactions/api/use-get-transactions'

import { transactionsColumns } from '../_columns'

export function MainArea() {
  const [month, setMonth] = useQueryState('month')

  const getTransactionsQuery = useGetTransactions(month)

  const transactions = getTransactionsQuery.data?.transactions || []

  return (
    <main className="h-full w-full">
      <DataTable columns={transactionsColumns} data={transactions} />
    </main>
  )
}
