import { UserButton } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

import { NavBar } from './_components/nav-bar'

export default async function Home() {
  const { userId } = await auth()

  if (!userId) {
    return redirect('/login')
  }

  return (
    <>
      <NavBar />
      <div className="flex h-full items-center justify-center">
        <UserButton showName />
      </div>
    </>
  )
}
