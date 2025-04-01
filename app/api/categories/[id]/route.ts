/* eslint-disbale @typescript-eslint/no-unused-vars */

import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'

import { deleteCategroy } from '@/app/_features/categories/actions/delete-category'
import { editCategory } from '@/app/_features/categories/actions/edit-category'
import { getCategoryById } from '@/app/_features/categories/actions/get-category-by-id'
import { editCategoryFormSchema } from '@/app/_validation/categories/edit-category-validator'

interface Params {
  params: {
    id: string
  }
}

export async function GET(request: NextRequest, { params }: Params) {
  const id = params.id

  if (!id) {
    return NextResponse.json({ error: { message: 'MISSING_URL_PARAMS' } }, { status: 400 })
  }

  const { userId } = await auth()

  if (!userId) {
    return NextResponse.json({ error: { message: 'UNAUTHORIZED' } }, { status: 403 })
  }

  try {
    const category = await getCategoryById(id, userId)

    if (!category) {
      return NextResponse.json(
        { error: { message: 'CATEGORY_NOT_FOUND', code: 'CT0003' } },
        { status: 404 }
      )
    }

    return NextResponse.json(category, { status: 200 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: { message: 'INTERNAL_SERVER_ERROR' } }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: Params) {
  const id = params.id

  if (!id) {
    return NextResponse.json({ error: { message: 'MISSING_URL_PARAMS' } }, { status: 400 })
  }

  const { userId } = await auth()

  if (!userId) {
    return NextResponse.json({ error: { message: 'UNAUTHORIZED' } }, { status: 403 })
  }

  try {
    const body = await request.json()

    const revalidateData = editCategoryFormSchema.parse(body)

    const category = await getCategoryById(id, userId)

    if (!category) {
      return NextResponse.json(
        { error: { message: 'CATEGORY_NOT_FOUND', code: 'CT0003' } },
        { status: 404 }
      )
    }

    const updatedCategory = await editCategory({
      ...revalidateData,
      userId,
      categoryId: category.id,
    })

    return NextResponse.json({ category: updatedCategory }, { status: 200 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: { message: 'INTERNAL_SERVER_ERROR' } }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  const id = params.id

  if (!id) {
    return NextResponse.json({ error: { message: 'MISSING_URL_PARAMS' } }, { status: 400 })
  }

  const { userId } = await auth()

  if (!userId) {
    return NextResponse.json({ error: { message: 'UNAUTHORIZED' } }, { status: 403 })
  }

  try {
    const category = await getCategoryById(id, userId)

    if (!category) {
      return NextResponse.json(
        { error: { message: 'CATEGORY_NOT_FOUND', code: 'CT0003' } },
        { status: 404 }
      )
    }

    const deletedCategory = await deleteCategroy(category.id, userId)

    return NextResponse.json({ category: deletedCategory }, { status: 200 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: { message: 'INTERNAL_SERVER_ERROR' } }, { status: 500 })
  }
}
