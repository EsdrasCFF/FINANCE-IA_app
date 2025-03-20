import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

import { NavBar } from '../_components/nav-bar'

export default async function SubscriptionPage() {
  const { userId } = await auth()

  if (!userId) {
    return redirect('/login')
  }
  return (
    <>
      <NavBar />

      <div>Subscription Page</div>
    </>
  )
}
