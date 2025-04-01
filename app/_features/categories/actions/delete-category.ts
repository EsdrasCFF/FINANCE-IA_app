'use server'

import { db } from '@/app/_lib/prisma'

export async function deleteCategroy(categodyId: string, userId: string) {
  const deletedCategory = await db.category.delete({
    where: {
      id: categodyId,
      userId,
    },
  })

  return deletedCategory
}
