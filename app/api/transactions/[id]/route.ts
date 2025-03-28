/* eslint-disabe @typescript-eslint/no-unused-vars */

import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'

import { deleteTransaction } from '@/app/_features/transactions/actions/delete-transaction'
import { editTransaction } from '@/app/_features/transactions/actions/edit-transaction'
import { getTransactionById } from '@/app/_features/transactions/actions/get-transaction-by-id'
import { convertFromHundredUnitsToAmount } from '@/app/_lib/utils'
import { editTransactionFormSchema } from '@/app/_validation/transactions/edit-transaction-validator'

interface Params {
  params: {
    id: string
  }
}

export async function GET(req: NextRequest, { params }: Params) {
  const { userId } = await auth()

  if (!userId) {
    return NextResponse.json({ error: { message: 'UNAUTHENTICATED' } }, { status: 401 })
  }

  const transactionId = params.id

  if (!transactionId) {
    return NextResponse.json({ error: { message: 'MISSING_URL_PARAMS' } }, { status: 400 })
  }

  try {
    const transaction = await getTransactionById(transactionId, userId)

    if (!transaction) {
      return NextResponse.json({ error: { message: 'TRANSACTION_NOT_FOUND' } }, { status: 404 })
    }

    return NextResponse.json(
      {
        transaction: {
          ...transaction,
          amount: convertFromHundredUnitsToAmount(Number(transaction.amount)),
        },
      },
      { status: 200 }
    )
  } catch (err) {
    console.error('Failed to fetch transaction "/api/transactions/[id]":', err)
    return NextResponse.json(
      { error: { message: 'FAILER_TO_FETCH_TRANSACTIONS' } },
      { status: 400 }
    )
  }
}

export async function PUT(req: NextRequest, { params }: Params) {
  const { userId } = await auth()

  if (!userId) {
    return NextResponse.json({ error: { message: 'UNAUTHENTICATED' } }, { status: 401 })
  }

  const transactionId = params.id

  if (!transactionId) {
    return NextResponse.json({ error: { message: 'MISSING_URL_PARAMS' } }, { status: 400 })
  }

  const body = await req.json()

  const data = editTransactionFormSchema.parse(body)

  try {
    const transaction = await getTransactionById(transactionId, userId)

    if (!transaction) {
      return NextResponse.json({ error: { message: 'TRANSACTION_NOT_FOUND' } }, { status: 404 })
    }

    const updatedTransaction = await editTransaction(data, transactionId, userId)

    return NextResponse.json(
      {
        transaction: {
          ...updatedTransaction,
          amount: convertFromHundredUnitsToAmount(Number(transaction.amount)),
        },
      },
      { status: 200 }
    )
  } catch (err) {
    console.error('Failed to fetch transaction "/api/transactions/[id]":', err)
    return NextResponse.json(
      { error: { message: 'FAILER_TO_FETCH_TRANSACTIONS' } },
      { status: 400 }
    )
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  const id = params.id

  if (!id) {
    return NextResponse.json({ error: { message: 'MISSING_URL_PARAMS' } }, { status: 400 })
  }

  const { userId } = await auth()

  if (!userId) {
    return NextResponse.json({ error: { message: 'UNAUTHORIZED' } }, { status: 403 })
  }

  try {
    const deletedTransaction = await deleteTransaction(id, userId)

    if (!deletedTransaction) {
      return NextResponse.json({ error: { message: 'NOT_FOUND' } }, { status: 404 })
    }

    return NextResponse.json({ transaction: deletedTransaction }, { status: 200 })
  } catch (error) {
    console.error('Failed to delete transaction:', error)
    return NextResponse.json({ error: { message: 'INTERNAL_SERVER_ERROR' } }, { status: 500 })
  }
}
