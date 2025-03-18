'use client'

import { Transaction } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import { PencilIcon, TrashIcon } from 'lucide-react'

import { Badge } from '../_components/ui/badge'
import { Button } from '../_components/ui/button'
import { PAYMENT_METHOD_LABELS } from '../_constants/transactions'
import {
  convertFromHundredUnitsToAmount,
  formatCurrency,
  formatDateToCompleteLabel,
} from '../_lib/utils'
import { TransactionTypeBadge } from './_components/type-bagde'

interface TransactionsType extends Transaction {
  category: string | null
}

export const transactionsColumns: ColumnDef<TransactionsType>[] = [
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
    accessorKey: 'categoryId',
    header: 'Categoria',
    cell: (data) => {
      return data.row.original.category || <Badge variant="destructive"> Sem Categoria </Badge>
    },
  },
  {
    accessorKey: 'paymentMethod',
    header: 'Método Pagamento',
    cell: (data) => PAYMENT_METHOD_LABELS[data.row.original.paymentMethod],
  },
  {
    accessorKey: 'date',
    header: 'Data',
    cell: (data) => formatDateToCompleteLabel(data.row.original.date),
  },
  {
    accessorKey: 'amount',
    header: 'Valor',
    cell: (data) => formatCurrency(convertFromHundredUnitsToAmount(data.row.original.amount)),
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
