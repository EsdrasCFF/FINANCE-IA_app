import { isMatch } from 'date-fns'
import { NextResponse } from 'next/server'

import { getSummaryByCategories } from '@/app/_actions/categories/get-summary-by-categories'
import { getSummary } from '@/app/_actions/dashboard/get-summary'
import { getMonthRange, getMonthRangeNow } from '@/app/_lib/utils'

export async function GET(request: Request) {
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

    const summary = await getSummary(period)

    const categorySummary = await getSummaryByCategories(period) //HERE

    return NextResponse.json({ summary, categorySummary }, { status: 200 })
  } catch (err) {
    console.log('Error:', err)

    return NextResponse.json({ error: { message: 'NOT_FOUND' } }, { status: 404 })
  }
}
