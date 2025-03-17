'use client'

import { Transaction } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'

import { TransactionTypeBadge } from '../_components/transaction-type-bagde'

export const transactionsColumns: ColumnDef<Transaction>[] = [
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
  },
  {
    accessorKey: 'paymentMethod',
    header: 'Método Pagamento',
  },
  {
    accessorKey: 'date',
    header: 'Data',
  },
  {
    accessorKey: 'amount',
    header: 'Valor',
  },
  {
    accessorKey: 'actions',
    header: '',
  },
]
