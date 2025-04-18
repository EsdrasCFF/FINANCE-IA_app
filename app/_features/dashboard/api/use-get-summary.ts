'use client'

import { Transaction } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'

interface ITransactionsPercentage {
  expense: number
  investment: number
  deposit: number
}

export interface ICategorySummary {
  id: string
  name: string
  totalAmount: number
  percentage: number
}

interface IResponseType {
  summary: {
    DEPOSIT: number
    EXPENSE: number
    INVESTMENT: number
    transactionPercentages: ITransactionsPercentage
  }
  categorySummary: ICategorySummary[]
  transactions: Transaction[]
  balance: number
}

export function useGetSummary(month: string | null) {
  const key = month || 'default'

  const query = useQuery<IResponseType>({
    queryKey: ['summary', key],
    queryFn: async () => {
      const response = await fetch(`/api/summary?month=${month}`)

      if (response.status != 200) {
        throw new Error('Failed to fetch summary')
      }

      const data = await response.json()

      return data
    },
  })

  return query
}
