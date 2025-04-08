import { getTransactionsQuantity } from '../actions/get-transactions-count'
import { BasicPlan } from './basic-plan'
import { PremiumPlan } from './premium-plan'

export async function MainArea() {
  const quantity = await getTransactionsQuantity()

  return (
    <main className="flex gap-6">
      <BasicPlan quantity={quantity} />
      <PremiumPlan />
    </main>
  )
}
