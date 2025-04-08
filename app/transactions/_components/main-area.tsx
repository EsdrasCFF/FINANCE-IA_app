/* eslint-disable react-hooks/exhaustive-deps */

'use client'

import { Category } from '@prisma/client'
import { useQueryState } from 'nuqs'
import { useEffect } from 'react'

import { AddTransactionButton } from '@/app/_components/add-transaction-button'
import { DataTable } from '@/app/_components/ui/data-table'
import { useSaveCategoriesStore } from '@/app/_features/categories/hooks/use-save-categories'
import { useGetTransactions } from '@/app/_features/transactions/api/use-get-transactions'
import { useQueryParamsStore } from '@/app/_stores/use-query-params-store'
import { TimeSelect } from '@/app/(dashboard)/_components/time-select'

import { transactionsColumns } from '../_columns'

interface Props {
  categories: Category[]
  userCanAddTransaction: boolean
}

export function MainArea({ categories, userCanAddTransaction }: Props) {
  const [month, setMonth] = useQueryState('month')

  const getTransactionsQuery = useGetTransactions(month)

  const transactions = getTransactionsQuery.data?.transactions || []

  const isLoading = getTransactionsQuery.isLoading

  const { setNewMonth } = useQueryParamsStore()
  const { setCategories } = useSaveCategoriesStore()

  useEffect(() => {
    if (month) {
      setNewMonth(month)
    }

    setCategories(categories)
  }, [])

  return (
    <main className="mb-6 flex h-full w-full flex-col gap-6">
      <div className="mt-5 flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Transações</h1>

        <div className="flex gap-5">
          <AddTransactionButton categories={categories} addTransaction={userCanAddTransaction} />
          <TimeSelect month={month} setMonth={setMonth} />
        </div>
      </div>

      <DataTable columns={transactionsColumns} data={transactions} isLoading={isLoading} />
    </main>
  )
}
