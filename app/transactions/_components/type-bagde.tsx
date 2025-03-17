'use client'

import { TransactionType } from '@prisma/client'
import { CircleIcon } from 'lucide-react'
import { tv } from 'tailwind-variants'

import { Badge } from '../../_components/ui/badge'
import { TRANSACTION_TYPE_LABELS } from '../_columns'

interface TransactionTypeBadgeProps {
  type: TransactionType
}

export function TransactionTypeBadge({ type }: TransactionTypeBadgeProps) {
  const textColor = tv({
    base: 'text-xs font-bold',
    variants: {
      type: {
        DEPOSIT: 'text-customGreen bg-customGreen/15 hover:bg-customGreen/15',
        EXPENSE: 'text-customRed bg-customRed/15 hover:bg-customRed/15',
        INVESTMENT: 'text-white bg-white/15 hover:bg-white/15',
      },
    },
  })

  const fillColor = tv({
    base: 'mr-1',
    variants: {
      fill: {
        DEPOSIT: 'fill-customGreen',
        EXPENSE: 'fill-customRed',
        INVESTMENT: 'fill-white',
      },
    },
  })

  return (
    <Badge className={textColor({ type })}>
      <CircleIcon size={10} className={fillColor({ fill: type })} />
      <p>{TRANSACTION_TYPE_LABELS[type]}</p>
    </Badge>
  )
}
