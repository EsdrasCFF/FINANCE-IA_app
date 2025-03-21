import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

import { NavBar } from '../_components/nav-bar'
import { db } from '../_lib/prisma'
import { SummaryCards } from './_components/summary-cards'

export default async function Home() {
  const { userId } = await auth()

  if (!userId) {
    return redirect('/login')
  }

  const categories = await db.category.findMany({ where: { userId } })

  return (
    <>
      <NavBar />

      <div className="flex w-full px-6">
        <SummaryCards categories={categories} />
      </div>
    </>
  )
}
