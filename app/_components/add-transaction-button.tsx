'use client'

import { Category } from '@prisma/client'
import { ArrowDownUp } from 'lucide-react'

import { useAddTransactionStore } from '../_stores/add-transaction-store'
import { AddTransactionDialog } from '../transactions/_components/add-transaction-dialog'
import { Button } from './ui/button'

interface AddTransactionButtonProps {
  categories: Category[]
}

export function AddTransactionButton({ categories }: AddTransactionButtonProps) {
  const { onOpen } = useAddTransactionStore()

  return (
    <>
      <Button className="rounded-full text-sm font-bold" onClick={onOpen}>
        Adicionar Transação <ArrowDownUp className="ml-1" />
      </Button>

      <AddTransactionDialog categories={categories} />
    </>
  )
}
