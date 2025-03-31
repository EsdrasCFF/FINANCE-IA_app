import { TransactionType } from '@prisma/client'
import { z } from 'zod'

export const editCategoryFormSchema = z.object({
  name: z.string().trim().min(3, { message: 'O nome é obrigatório!' }),
  type: z.nativeEnum(TransactionType, { required_error: 'O tipo de Categoria é obrigatório' }),
})

export type EditCategoryFormData = z.infer<typeof editCategoryFormSchema>
