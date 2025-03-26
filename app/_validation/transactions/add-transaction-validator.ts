import { PaymentMethod, TransactionType } from '@prisma/client'
import { z } from 'zod'

export const addTransactionFormSchema = z.object({
  name: z.string().trim().min(3, { message: 'O nome é obrigatório!' }),
  amount: z
    .number({ required_error: 'Valor é obrigatório!' })
    .positive({ message: 'O valor precisa ser positivo' }),
  type: z.nativeEnum(TransactionType),
  category: z
    .string({ required_error: 'Categoria é obrigatória!' })
    .trim()
    .min(3, { message: 'Categoria é obrigatório!' }),
  paymentMethod: z.nativeEnum(PaymentMethod, {
    required_error: 'Método de pagamento é obrigatório',
  }),
  date: z.coerce.date({ required_error: 'Data é obrigatória!' }),
})

export type TransactionFormData = z.infer<typeof addTransactionFormSchema>
