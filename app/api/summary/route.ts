import { auth } from '@clerk/nextjs/server'
import { isMatch } from 'date-fns'
import { NextResponse } from 'next/server'

import { getTotalBalance } from '@/app/_actions/dashboard/get-total-balance'
import { getSummary } from '@/app/_features/dashboard/actions/get-summary'
import { getSummaryByCategories } from '@/app/_features/dashboard/actions/get-summary-by-categories'
import { getLastTransactions } from '@/app/_features/transactions/actions/get-last-transactions'
import { getMonthRange, getMonthRangeNow } from '@/app/_lib/utils'

export async function GET(request: Request) {
  const { userId } = await auth()

  if (!userId) {
    return NextResponse.json({ error: { message: 'UNAUTHORIZED' } }, { status: 401 })
  }

  try {
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

    const summary = await getSummary(period, userId)

    const actualBalance = await getTotalBalance()

    const categorySummary = await getSummaryByCategories(period, userId)

    const lastTransactions = await getLastTransactions()

    return NextResponse.json(
      { summary, categorySummary, transactions: lastTransactions, balance: actualBalance },
      { status: 200 }
    )
  } catch (err) {
    console.log('Error:', err)

    return NextResponse.json({ error: { message: 'NOT_FOUND' } }, { status: 404 })
  }
}
