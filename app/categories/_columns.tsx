'use client'

import { Category } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import { PencilIcon, TrashIcon } from 'lucide-react'

import { Button } from '../_components/ui/button'
import { TransactionTypeBadge } from '../transactions/_components/type-bagde'

export const transactionsColumns: ColumnDef<Category>[] = [
  {
    accessorKey: 'name',
    header: 'Nome',
  },
  {
    accessorKey: 'type',
    header: 'Tipo',
    cell: (data) => {
      const typePayment = data.row.original.type

      return <TransactionTypeBadge type={typePayment} />
    },
  },
  {
    accessorKey: 'actions',
    header: '',
    cell: () => {
      return (
        <div className="flex gap-1">
          <Button variant="ghost" className="size-6">
            <PencilIcon />
          </Button>

          <Button variant="ghost" className="size-6">
            <TrashIcon />
          </Button>
        </div>
      )
    },
  },
]
