import { BasicPlan } from './basic-plan'
import { PremiumPlan } from './premium-plan'

export function MainArea() {
  return (
    <main className="flex gap-6">
      <BasicPlan />
      <PremiumPlan />
    </main>
  )
}
