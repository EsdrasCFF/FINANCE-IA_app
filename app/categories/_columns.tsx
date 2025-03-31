'use client'

import { Category } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { Checkbox } from '../_components/ui/checkbox'
import { ActionsControl } from '../_features/categories/components/actions-control'
import { TransactionTypeBadge } from '../transactions/_components/type-bagde'

export const categorieColumns: ColumnDef<Category>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        className="border-white"
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        className="border-white"
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
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
    accessorKey: 'createdAt',
    header: 'Data Criação',
    cell: (data) => {
      return (
        <span className="">
          {format(data.row.original.createdAt, "dd 'de' MMM'/'yy", { locale: ptBR })}
        </span>
      )
    },
  },
  {
    accessorKey: 'actions',
    header: '',
    cell: (data) => {
      return (
        <div className="flex gap-1">
          <ActionsControl id={data.row.original.id} />
        </div>
      )
    },
  },
]
