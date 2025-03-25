import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

import { db } from '../_lib/prisma'
import { MainArea } from './_components/main-area'

export default async function TransactionsPage() {
  const { userId } = await auth()

  if (!userId) {
    return redirect('/login')
  }

  const categories = await db.category.findMany({ where: { userId } })

  return (
    <div className="space-y-6 px-6">
      <MainArea categories={categories} />
    </div>
  )
}
