import { PaymentMethod, Transaction, TransactionType } from '@prisma/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

interface IRequestType {
  name: string
  amount: number
  type: TransactionType
  category: string
  paymentMethod: PaymentMethod
  date: Date
}

interface IResponseType extends Transaction {
  category: string | null
}

export function useAddTransaction(month: string) {
  const queryClient = useQueryClient()

  const key = month

  const mutate = useMutation<IResponseType, Error, IRequestType>({
    mutationFn: async (params) => {
      const response = await fetch(`/api/transactions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      })

      if (response.status != 201) {
        throw new Error('Occurred an error while request api to create new transaction')
      }

      const data = await response.json()

      return data
    },
    onSuccess: async () => {
      toast.success('Nova transação cadastrada!')
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['summary', key] }),
        queryClient.invalidateQueries({ queryKey: ['transactions', key] }),
      ])
    },
  })

  return mutate
}
