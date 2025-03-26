import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

import { getCategories } from '@/app/_features/categories/actions/get-categories'

export async function GET() {
  const { userId } = await auth()

  if (!userId) {
    return NextResponse.json({ error: { message: 'UNAUTHORIZED' } }, { status: 401 })
  }

  try {
    const categories = await getCategories(userId)

    return NextResponse.json({ categories }, { status: 200 })
  } catch (err) {
    console.error('Error to fetch categories  "/categories":', err)
    return NextResponse.json({ error: { message: 'FAILER_TO_FETCH_CATEGORIES' } }, { status: 400 })
  }
}
