'use server'

import { TransactionType } from '@prisma/client'

import { db } from '@/app/_lib/prisma'

interface Props {
  name: string
  type: TransactionType
  userId: string
  categoryId: string
}

export async function editCategory(params: Props) {
  const { categoryId, userId, ...otherProps } = params

  const updatedCategory = await db.category.update({
    data: {
      ...otherProps,
    },
    where: {
      id: categoryId,
      userId,
    },
  })

  return updatedCategory
}
