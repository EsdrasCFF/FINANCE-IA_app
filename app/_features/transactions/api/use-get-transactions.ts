'use client'

import { Transaction } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'

import { useQueryParamsStore } from '@/app/_stores/use-query-params-store'

interface TransactionsWithCategory extends Transaction {
  category: string | null
}

interface IResponseType {
  transactions: TransactionsWithCategory[]
}

export function useGetTransactions(month: string | null) {
  const { month: defaultMonth } = useQueryParamsStore()

  const key = month || defaultMonth

  const query = useQuery<IResponseType>({
    queryKey: ['transactions', key],
    queryFn: async () => {
      const response = await fetch(`/api/transactions?month=${key}`)

      if (response.status != 200) {
        throw new Error('Failed to fetch summary')
      }

      const data = await response.json()

      return data
    },
  })

  return query
}
