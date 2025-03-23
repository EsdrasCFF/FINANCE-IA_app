'use server'

import { auth } from '@clerk/nextjs/server'
import { Prisma } from '@prisma/client'

import { db } from '@/app/_lib/prisma'
import { convertFromHundredUnitsToAmount } from '@/app/_lib/utils'

export async function getSummaryByCategories(month: { firstDay: string; lastDay: string }) {
  const { userId } = await auth()

  if (!userId) {
    throw new Error('UNAUTHORIZED')
  }

  const query = Prisma.sql`
    SELECT
      c.id AS category_id,
      c.name AS category_name,
      SUM(t.amount) AS total_amount

    FROM
      transactions t
    JOIN
      categories c ON c.id = t.category_id
    WHERE
      c.type = 'EXPENSE'
      AND t.user_id = ${userId}
      AND t.date BETWEEN ${month.firstDay}::timestamp AND ${month.lastDay}::timestamp
    GROUP BY
      c.id, c.name
    ORDER BY total_amount DESC
  `

  const result =
    await db.$queryRaw<{ category_id: string; category_name: string; total_amount: bigint }[]>(
      query
    )

  const categoriesWithValues = result.map((data) => {
    const { total_amount, ...otherProps } = data

    const amount = convertFromHundredUnitsToAmount(Number(total_amount))

    return {
      ...otherProps,
      totalAmount: amount,
    }
  })

  const totalExpense = categoriesWithValues.reduce((acc, curr) => {
    const total = curr.totalAmount + acc
    return total
  }, 0)

  const totalExpensesPerCategory = categoriesWithValues.map((values) => {
    const percentage = Math.round((values.totalAmount / totalExpense) * 100)

    return {
      id: values.category_id,
      name: values.category_name,
      totalAmount: values.totalAmount,
      percentage,
    }
  })

  return totalExpensesPerCategory
}
