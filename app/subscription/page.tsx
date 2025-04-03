import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

import { MainArea } from '../_features/subscription/components/main-area'

export default async function SubscriptionPage() {
  const { userId } = await auth()

  if (!userId) {
    return redirect('/login')
  }
  return (
    <div className="space-y-6 px-6 pb-6">
      <div className="mt-5 flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Assinatura</h1>
      </div>

      <MainArea />
    </div>
  )
}
