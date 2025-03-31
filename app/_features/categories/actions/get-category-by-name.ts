'use server'

import { db } from '@/app/_lib/prisma'

export async function getCategoryByName(name: string, userId: string) {
  const category = await db.category.findMany({
    where: {
      name: {
        equals: name,
        mode: 'insensitive',
      },
      userId,
    },
  })

  return category
}
