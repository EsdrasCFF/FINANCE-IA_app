import { NextResponse } from 'next/server'

import { getSummary } from '@/app/_actions/dashboard/get-summary'
import { getMonthRange, getMonthRangeNow } from '@/app/_lib/utils'

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)

    const month = url.searchParams.get('month')

    // if (!month) {
    //   return NextResponse.json(
    //     { error: { mesage: 'MISSING_REQUIRED_QUERY_PARAMTER' } },
    //     { status: 400 }
    //   )
    // }

    let period

    if (month == 'null' || !month) {
      period = getMonthRangeNow()
    } else {
      period = getMonthRange(month)
    }

    const summary = await getSummary(period)

    return NextResponse.json({ summary }, { status: 200 })
  } catch (err) {
    console.log('Error:', err)

    return NextResponse.json({ error: { message: 'NOT_FOUND' } }, { status: 404 })
  }
}
