import { Transaction } from '@prisma/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { TransactionWithCategory } from './use-get-transaction'

interface IRequestType {
  id: string
}

interface IReponseType {
  transaction: Transaction
}

interface PrevTransactionsType {
  transactions: TransactionWithCategory[]
}

export function useDeleteTransaction(month: string) {
  const queryClient = useQueryClient()

  const mutate = useMutation<IReponseType, Error, IRequestType>({
    mutationFn: async (json) => {
      const reponse = await fetch(`/api/transactions/${json.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (reponse.status != 200) {
        throw new Error('Failed to delete transaction "use-delete-transaction:react-query"')
      }

      const data = await reponse.json()

      return data
    },
    onMutate: (json) => {
      const getData: PrevTransactionsType | undefined = queryClient.getQueryData([
        'transactions',
        month,
      ])

      if (!getData) return

      const filteredTransactions = getData.transactions.filter(
        (transaction) => transaction.id != json.id
      )

      queryClient.setQueryData(['transactions', month], { transactions: filteredTransactions })
    },
    onSuccess: () => {
      toast.success('Transação deletada com sucesso!')
      queryClient.invalidateQueries({ queryKey: ['summary', month] })
    },
    onError: (err) => {
      console.error('Error try delete transaction:', err)
      toast.error('Ocorreu um erro ao tentar deletar transação, tente novamente mais tarde')
      queryClient.invalidateQueries({ queryKey: ['transactions', month] })
    },
  })

  return mutate
}
