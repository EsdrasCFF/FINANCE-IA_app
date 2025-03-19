'use client'

import { Transaction } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import { TrashIcon } from 'lucide-react'

import { EditTransactionButton } from '../_components/edit-transaction-button'
import { Badge } from '../_components/ui/badge'
import { Button } from '../_components/ui/button'
import { PAYMENT_METHOD_LABELS } from '../_constants/transactions'
import {
  convertFromHundredUnitsToAmount,
  formatCurrency,
  formatDateToCompleteLabel,
} from '../_lib/utils'
import { TransactionTypeBadge } from './_components/type-bagde'

export interface TransactionWithCategoryProps extends Transaction {
  category: string | null
}

export const transactionsColumns: ColumnDef<TransactionWithCategoryProps>[] = [
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
    cell: (data) => {
      return (
        <div className="flex gap-1">
          <EditTransactionButton
            transaction={data.row.original as TransactionWithCategoryProps}
            key={data.row.original.id}
          />

          <Button variant="ghost" className="size-6">
            <TrashIcon />
          </Button>
        </div>
      )
    },
  },
]
