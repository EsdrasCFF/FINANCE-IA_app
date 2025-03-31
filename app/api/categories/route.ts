import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

import { addCategory } from '@/app/_features/categories/actions/add-category'
import { getCategories } from '@/app/_features/categories/actions/get-categories'
import { getCategoryByName } from '@/app/_features/categories/actions/get-category-by-name'
import { addCategoryFormSchema } from '@/app/_validation/categories/add-categories-validator'

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

export async function POST(request: Request) {
  const { userId } = await auth()

  if (!userId) {
    return NextResponse.json({ error: { message: 'UNAUTHORIZED' } }, { status: 401 })
  }

  const body = await request.json()

  try {
    const revalidateData = addCategoryFormSchema.parse(body)

    const categoryIsInUse = await getCategoryByName(revalidateData.name, userId)

    if (categoryIsInUse.length > 0) {
      return NextResponse.json(
        { error: { message: 'PROVIDED_BODY_PARAMS_IS_INVALID', code: 'CT0001' } },
        { status: 400 }
      )
    }

    const category = await addCategory({ ...revalidateData, userId })

    if (!category) {
      return NextResponse.json(
        { error: { message: 'ERROR_DURING_CATEGORY_CRIATION', code: 'CT0002' } },
        { status: 400 }
      )
    }

    return NextResponse.json(category, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: { message: 'INTERNAL_SERVER_ERROR', code: '500' } },
      { status: 500 }
    )
  }
}
