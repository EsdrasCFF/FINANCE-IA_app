'use client'

import { useQuery } from '@tanstack/react-query'

interface IResponseType {
  summary: {
    DEPOSIT: number
    EXPENSE: number
    INVESTMENT: number
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
