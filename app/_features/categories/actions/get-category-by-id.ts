'use server'

import { db } from '@/app/_lib/prisma'

export async function getCategoryById(id: string, userId: string) {
  const category = await db.category.findUnique({
    where: {
      id,
      userId,
    },
  })

  return category
}
