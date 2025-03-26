'use client'

import { PaymentMethod, TransactionType } from '@prisma/client'
import { Loader2 } from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/app/_components/ui/dialog'

import { useGetCategories } from '../../categories/api/use-get-categories'
import { useGetTransaction } from '../api/use-get-transaction'
import { useEditTransactionStore } from '../hooks/use-edit-transaction-store'
import { EditTransactionForm } from './edit-transaction-form'

export function EditTransactionDialog() {
  const { isOpen, onClose, id } = useEditTransactionStore()

  const getCategoriesQuery = useGetCategories()
  const getTransactionQuery = useGetTransaction(id)

  const categories = getCategoriesQuery.data?.categories || []
  const transactionData = getTransactionQuery.data?.transaction

  const isLoading = getCategoriesQuery.isLoading || getTransactionQuery.isLoading

  const defaultValues = transactionData && {
    amount: transactionData.amount,
    category: transactionData.categoryId as string,
    date: transactionData.date,
    name: transactionData.name,
    paymentMethod: transactionData.paymentMethod as PaymentMethod,
    type: transactionData.type as TransactionType,
  }

  return (
    <Dialog onOpenChange={onClose} open={isOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Transação</DialogTitle>
          <DialogDescription> Insira as informações abaixo </DialogDescription>
        </DialogHeader>

        {isLoading || !transactionData ? (
          <div className="flex h-[500px] w-full items-center justify-center">
            <Loader2 className="animate-spin" />
          </div>
        ) : (
          <EditTransactionForm
            categories={categories}
            transactionData={transactionData}
            defaultValeus={defaultValues}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}
