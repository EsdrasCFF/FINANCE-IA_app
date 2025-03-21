import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

import { NavBar } from '../_components/nav-bar'
import { db } from '../_lib/prisma'
import { SummaryCards } from './_components/summary-cards'
import { TimeSelect } from './_components/time-select'

export default async function Home() {
  const { userId } = await auth()

  if (!userId) {
    return redirect('/login')
  }

  const categories = await db.category.findMany({ where: { userId } })

  return (
    <>
      <NavBar />

      <div className="flex w-full justify-between px-6 py-5">
        <h1 className="text-2xl font-bold">Transações</h1>
        <TimeSelect />
      </div>

      <div className="flex w-full px-6">
        <SummaryCards categories={categories} />
      </div>
    </>
  )
}
