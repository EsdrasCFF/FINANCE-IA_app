import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

import { db } from '../_lib/prisma'
import { FinanceOverview } from './_components/finance-overview'

export default async function Home() {
  const { userId } = await auth()

  if (!userId) {
    return redirect('/login')
  }

  const categories = await db.category.findMany({ where: { userId } })

  return (
    <div className="flex h-full w-full px-6 pb-6">
      <FinanceOverview categories={categories} />
    </div>
  )
}
