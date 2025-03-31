import { TransactionType } from '@prisma/client'
import { z } from 'zod'

export const addCategoriesFormSchema = z.object({
  name: z.string().trim().min(3, { message: 'O nome é obrigatório!' }),
  type: z.nativeEnum(TransactionType),
})

export type CategoriesFormData = z.infer<typeof addCategoriesFormSchema>
