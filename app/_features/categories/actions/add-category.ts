'use server'

import { TransactionType } from '@prisma/client'

import { db } from '@/app/_lib/prisma'

interface AddCategoryProps {
  name: string
  userId: string
  type: TransactionType
}

export async function addCategory(params: AddCategoryProps) {
  const category = await db.category.create({
    data: {
      name: params.name,
      type: params.type,
      userId: params.userId,
    },
  })

  return category
}
