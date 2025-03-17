'use client'

import { Transaction } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import { PencilIcon, TrashIcon } from 'lucide-react'

import { Badge } from '../_components/ui/badge'
import { Button } from '../_components/ui/button'
import {
  convertFromHundredUnitsToAmount,
  formatCurrency,
  formatDateToCompleteLabel,
} from '../_lib/utils'
import { TransactionTypeBadge } from './_components/type-bagde'

interface TransactionsType extends Transaction {
  category: string | null
}

export const PAYMENT_METHOD_LABELS = {
  CREDIT_CARD: 'C. Crédito',
  DEBIT_CARD: 'C. Débito',
  BANK_TRANSFER: 'TED',
  BANK_SLIP: 'Boleto',
  CASH: 'Dinheiro',
  PIX: 'Pix',
  OTHER: 'Outros',
}

export const TRANSACTION_TYPE_LABELS = {
  DEPOSIT: 'Receita',
  EXPENSE: 'Despesa',
  INVESTMENT: 'Investimento',
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
        <div>
          <Button variant="ghost">
            <PencilIcon className="size-4" />
          </Button>

          <Button variant="ghost">
            <TrashIcon className="size-4" />
          </Button>
        </div>
      )
    },
  },
]
