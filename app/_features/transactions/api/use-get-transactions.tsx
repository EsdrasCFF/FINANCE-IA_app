'use client'

import { Transaction } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'

interface TransactionsWithCategory extends Transaction {
  category: string | null
}

interface IResponseType {
  transactions: TransactionsWithCategory[]
}

export function useGetTransactions(month: string | null) {
  const query = useQuery<IResponseType>({
    queryKey: ['transactions', month],
    queryFn: async () => {
      const response = await fetch(`/api/transactions?month=${month}`)

      if (response.status != 200) {
        throw new Error('Failed to fetch summary')
      }

      const data = await response.json()

      return data
    },
  })

  return query
}
