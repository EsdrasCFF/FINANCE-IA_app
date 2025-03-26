/* eslint-disabe @typescript-eslint/no-unused-vars */

import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'

import { getTransactionById } from '@/app/_features/transactions/actions/get-transaction-by-id'
import { convertFromHundredUnitsToAmount } from '@/app/_lib/utils'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
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
