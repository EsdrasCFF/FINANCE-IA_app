'use client'

import { PencilIcon } from 'lucide-react'
import { useState } from 'react'

import { TransactionWithCategoryProps } from '../transactions/_columns'
import { EditTransactionDialog } from '../transactions/_components/edit-transaction-dialog'
import { Button } from './ui/button'

interface EditTransactionButtonProps {
  transaction: TransactionWithCategoryProps
}

export function EditTransactionButton({ transaction }: EditTransactionButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  function onOpenDialog() {
    setIsOpen(true)
  }

  function onCloseDialog() {
    setIsOpen(false)
  }
  return (
    <>
      <Button variant="ghost" className="size-6" onClick={() => setIsOpen(true)}>
        <PencilIcon />
      </Button>

      <EditTransactionDialog
        transaction={transaction}
        openDialog={isOpen}
        onOpen={onOpenDialog}
        onClose={onCloseDialog}
      />
    </>
  )
}
