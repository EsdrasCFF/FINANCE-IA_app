import { auth } from '@clerk/nextjs/server'
import { isMatch } from 'date-fns'
import { NextResponse } from 'next/server'

import { addTransaction } from '@/app/_features/transactions/actions/add-transactions'
import { getTransactions } from '@/app/_features/transactions/actions/get-transactions'
import { getMonthRange, getMonthRangeNow } from '@/app/_lib/utils'
import { addTransactionFormSchema } from '@/app/_validation/transactions/add-transaction-validator'

export async function GET(request: Request) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: { message: 'UNAUTHENTICATED' } }, { status: 403 })
    }

    const url = new URL(request.url)

    const month = url.searchParams.get('month')

    if (month && month != 'null') {
      const isValidMonth = isMatch(month, 'yyyy-MM')

      if (!isValidMonth) {
        return NextResponse.json(
          { error: { mesage: 'PROVIDED_QUERY_PARAMTER_IS_INVALID' } },
          { status: 400 }
        )
      }
    }

    let period

    if (month == 'null' || !month) {
      period = getMonthRangeNow()
    } else {
      period = getMonthRange(month)
    }

    const transactionsWithCategory = await getTransactions(period, userId)

    return NextResponse.json({ transactions: transactionsWithCategory }, { status: 200 })
  } catch (err) {
    console.error('Ocurred an error to fetch transactions "/api/transactions":', err)
    return NextResponse.json(
      { error: { message: 'FAILER_TO_FETCH_TRANSACTIONS' } },
      { status: 400 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: { message: 'UNAUTHENTICATED' } }, { status: 403 })
    }

    const body = await request.json()

    const validateData = addTransactionFormSchema.parse(body)

    const createdTransaction = await addTransaction({ ...validateData, userId })

    if (!createdTransaction) {
      return NextResponse.json({ error: { message: 'OCURRED_AN_ERROR_TO_THE_CREATE_TRANSACTION' } })
    }

    return NextResponse.json({ transaction: body }, { status: 201 })
  } catch (err) {
    console.error('Failed to create transaction:', err)
    return NextResponse.json({ error: { message: 'INTERNAL_SERVER_ERROR' } }, { status: 500 })
  }
}
