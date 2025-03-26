'use server'

import { db } from '@/app/_lib/prisma'

export async function getCategories(userId: string) {
  const categories = await db.category.findMany({ where: { userId } })

  return categories
}
