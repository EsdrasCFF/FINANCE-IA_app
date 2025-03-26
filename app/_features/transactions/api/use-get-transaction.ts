import { Transaction } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'

export interface TransactionWithCategory extends Transaction {
  category: string
}

export interface IResponseType {
  transaction: TransactionWithCategory
}

export function useGetTransaction(transactionId?: string) {
  const query = useQuery<IResponseType>({
    queryKey: ['transaction', transactionId],
    queryFn: async () => {
      const response = await fetch(`/api/transactions/${transactionId}`)

      if (response.status != 200) {
        throw new Error('Failed to fetch categories - react-query')
      }

      const data = await response.json()

      return data
    },
    enabled: !!transactionId,
  })

  return query
}
