/* eslint-disable @typescript-eslint/no-empty-object-type */

import { Transaction } from '@prisma/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { useQueryParamsStore } from '@/app/_stores/use-query-params-store'
import { EditTransactionFormData } from '@/app/_validation/transactions/edit-transaction-validator'

import { useSaveCategoriesStore } from '../../categories/hooks/use-save-categories'
import { TransactionWithCategory } from './use-get-transaction'

interface IResponseType {
  transaction: Transaction
}

interface IRequestType extends EditTransactionFormData {}

type PrevTransactionsType = {
  transactions: TransactionWithCategory[]
}

export function useEditTransaction(transactionId: string) {
  const queryClient = useQueryClient()
  const { month } = useQueryParamsStore()

  const { categories } = useSaveCategoriesStore()

  const mutate = useMutation<IResponseType, Error, IRequestType>({
    mutationFn: async (json) => {
      const response = await fetch(`/api/transactions/${transactionId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'PUT',
        body: JSON.stringify(json),
      })

      if (response.status != 200) {
        throw new Error('Error to update transaction "react-query:use-edit-transaction"')
      }

      const data = await response.json()

      return data
    },
    onError: (err) => {
      toast.error('Ocorreu um erro ao editar transação')
      console.error(err)
    },
    onMutate: (json) => {
      const data: PrevTransactionsType | undefined = queryClient.getQueryData([
        'transactions',
        month,
      ])

      if (!data) return

      const updatedCategory = categories.find((category) => category.id == json.category)

      const newTransactions = data.transactions.map((transaction) => {
        if (transaction.id != transactionId) {
          return transaction
        }

        return {
          ...transaction,
          amount: json.amount,
          categoryId: updatedCategory?.id ?? transaction.categoryId,
          category: updatedCategory?.name ?? transaction.category,
          date: json.date,
          name: json.name,
          paymentMethod: json.paymentMethod,
          type: json.type,
        }
      })

      queryClient.setQueryData(['transactions', month], { transactions: newTransactions })
    },
  })

  return mutate
}
