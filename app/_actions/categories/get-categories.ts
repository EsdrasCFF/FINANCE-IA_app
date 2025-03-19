'use server'

import { auth } from '@clerk/nextjs/server'

import { db } from '@/app/_lib/prisma'

export async function getGategories() {
  const { userId } = await auth()

  if (!userId) {
    throw new Error('Unauthorized')
  }

  const categories = await db.category.findMany({ where: { userId } })

  return categories
}
