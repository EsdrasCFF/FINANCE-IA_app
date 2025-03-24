import { Transaction } from '@prisma/client'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Atom, Banknote, Barcode, Bitcoin, CreditCard, RefreshCw } from 'lucide-react'
import { tv } from 'tailwind-variants'

import { formatCurrency } from '../_lib/utils'

interface TransactionDetailsProps {
  transaction: Transaction
}

export function TransactionDetails({ transaction }: TransactionDetailsProps) {
  const textColor = tv({
    base: '',
    variants: {
      type: {
        DEPOSIT: 'text-[#39BE00]',
        EXPENSE: 'text-[#E93030]',
        INVESTMENT: 'text-white',
      },
    },
  })

  const PAYMENT_METHOD_IMAGE = {
    CREDIT_CARD: <CreditCard size={20} className={textColor({ type: transaction.type })} />,
    DEBIT_CARD: <CreditCard size={20} className={textColor({ type: transaction.type })} />,
    BANK_TRANSFER: <RefreshCw size={20} className={textColor({ type: transaction.type })} />,
    BANK_SLIP: <Barcode size={20} className={textColor({ type: transaction.type })} />,
    CASH: <Banknote size={20} className={textColor({ type: transaction.type })} />,
    PIX: <Atom size={20} className={textColor({ type: transaction.type })} />,
    OTHER: <Bitcoin size={20} className={textColor({ type: transaction.type })} />,
  }

  return (
    <div className="mb-6 flex w-full items-center justify-between text-sm">
      <div className="flex gap-3">
        <div className="flex size-10 items-center justify-center rounded-md bg-muted/50">
          {PAYMENT_METHOD_IMAGE[transaction.paymentMethod]}
        </div>

        <div className="flex flex-col">
          <p className="font-bold capitalize">{transaction.name.toLowerCase()}</p>
          <span className="capitalize text-muted-foreground/60">
            {format(transaction.date, "dd MMM',' yyyy", { locale: ptBR })}
          </span>
        </div>
      </div>

      <div className="font-bold">
        <p className={textColor({ type: transaction.type })}>
          {transaction.type == 'DEPOSIT' ? '+' : '-'}
          <span>{formatCurrency(transaction.amount)}</span>
        </p>
      </div>
    </div>
  )
}
