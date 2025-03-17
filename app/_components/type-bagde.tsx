'use client'

import { TransactionType } from '@prisma/client'
import { CircleIcon } from 'lucide-react'

import { cn } from '../_lib/utils'
import { Badge } from './ui/badge'

interface TransactionTypeBadgeProps {
  type: TransactionType
}

export function TransactionTypeBadge({ type }: TransactionTypeBadgeProps) {
  let variant = ''
  let transactionType = ''

  if (type == 'DEPOSIT') {
    variant = 'green-700'
    transactionType = 'Receita'
  }
  if (type == 'EXPENSE') {
    variant = 'red-700'
    transactionType = 'Despesa'
  }
  if (type == 'INVESTMENT') {
    variant = 'white'
    transactionType = 'Investimento'
  }

  return (
    <Badge className={cn('bg-muted text-xs font-bold hover:bg-muted', `text-${variant}`)}>
      <CircleIcon size={10} className={cn('mr-1', `fill-${variant} `)} />
      <p>{transactionType}</p>
    </Badge>
  )
}
