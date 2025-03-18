import { PaymentMethod,TransactionType } from '@prisma/client'

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

export const TRANSACTION_TYPE_OPTIONS = [
  {
    value: TransactionType.DEPOSIT,
    label: 'Receita',
  },
  {
    value: TransactionType.EXPENSE,
    label: 'Despesa',
  },
  {
    value: TransactionType.INVESTMENT,
    label: 'Investimento',
  },
]

export const PAYMENT_METHOD_OPTIONS = [
  {
    value: PaymentMethod.BANK_TRANSFER,
    label: PAYMENT_METHOD_LABELS[PaymentMethod.BANK_TRANSFER],
  },
  {
    value: PaymentMethod.BANK_SLIP,
    label: PAYMENT_METHOD_LABELS[PaymentMethod.BANK_SLIP],
  },
  {
    value: PaymentMethod.CASH,
    label: PAYMENT_METHOD_LABELS[PaymentMethod.CASH],
  },
  {
    value: PaymentMethod.CREDIT_CARD,
    label: PAYMENT_METHOD_LABELS[PaymentMethod.CREDIT_CARD],
  },
  {
    value: PaymentMethod.DEBIT_CARD,
    label: PAYMENT_METHOD_LABELS[PaymentMethod.DEBIT_CARD],
  },
  {
    value: PaymentMethod.OTHER,
    label: PAYMENT_METHOD_LABELS[PaymentMethod.OTHER],
  },
  {
    value: PaymentMethod.PIX,
    label: PAYMENT_METHOD_LABELS[PaymentMethod.PIX],
  },
]
