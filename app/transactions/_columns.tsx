'use client'

import { Transaction } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'

import { Badge } from '../_components/ui/badge'
import { PAYMENT_METHOD_LABELS } from '../_constants/transactions'
import { formatCurrency, formatDateToCompleteLabel } from '../_lib/utils'
import { ActionsControl } from './_components/actions-control'
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
    cell: (data) => formatCurrency(data.row.original.amount),
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: (data) => {
      const id = data.row.original.id

      return <ActionsControl id={id} />
    },
  },
]
