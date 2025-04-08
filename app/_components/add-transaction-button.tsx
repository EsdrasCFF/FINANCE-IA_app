'use client'

import { Category } from '@prisma/client'
import { ArrowDownUp } from 'lucide-react'
import { toast } from 'sonner'

import { useAddTransactionStore } from '../_stores/add-transaction-store'
import { AddTransactionDialog } from '../transactions/_components/add-transaction-dialog'
import { Button } from './ui/button'

interface AddTransactionButtonProps {
  categories: Category[]
  addTransaction?: boolean
}

export function AddTransactionButton({
  categories,
  addTransaction = true,
}: AddTransactionButtonProps) {
  const { onOpen } = useAddTransactionStore()

  function handleAddTransactionClick() {
    if (addTransaction) {
      onOpen()
      return
    }

    toast.error('Você atingiu o limite de transações gratuitas', { duration: 5000 })
    return
  }

  return (
    <>
      <Button className="rounded-full text-sm font-bold" onClick={handleAddTransactionClick}>
        Adicionar Transação <ArrowDownUp className="ml-1" />
      </Button>

      <AddTransactionDialog categories={categories} />
    </>
  )
}
