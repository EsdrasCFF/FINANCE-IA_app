'use client'

import { useQuery } from '@tanstack/react-query'

interface ITransactionsPercentage {
  expense: number
  investment: number
  deposit: number
}

interface IResponseType {
  summary: {
    DEPOSIT: number
    EXPENSE: number
    INVESTMENT: number
    transactionPercentages: ITransactionsPercentage
  }
}

export function useGetSummary(month: string | null) {
  const query = useQuery<IResponseType>({
    queryKey: ['summary', month],
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
