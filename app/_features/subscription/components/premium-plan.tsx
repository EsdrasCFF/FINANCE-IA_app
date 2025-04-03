'use client'

import { loadStripe } from '@stripe/stripe-js'
import { Check } from 'lucide-react'

import { Button } from '@/app/_components/ui/button'
import { Card } from '@/app/_components/ui/card'
import { Separator } from '@/app/_components/ui/separator'

import { crateStripeCheckout } from '../actions/create-stripe-checkout'

export function PremiumPlan() {
  async function handleBuyPremiumPlanClick() {
    const { sessionId } = await crateStripeCheckout()

    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string)

    if (!stripe) {
      throw new Error('Stripe not found')
    }

    await stripe.redirectToCheckout({ sessionId })
  }

  return (
    <Card className="relative flex w-full max-w-[450px] flex-col py-10">
      {/* PRINCE AND DESCRIPTION */}
      <div className="flex flex-col items-center justify-center font-semibold">
        <p className="text-2xl">Plano Pro</p>
        <div className="mt-6 flex items-center justify-center gap-3 text-6xl">
          <span className="text-4xl font-normal"> R$ </span>
          <span>19</span>
          <span className="text-2xl font-normal text-muted-foreground">/mês </span>
        </div>
      </div>
      <Separator className="my-10" />
      {/* SERVICES */}
      <div className="flex flex-col gap-4 px-10">
        <div className="flex gap-5">
          <Check className="text-primary" /> <span>Transações ilimitadas</span>
        </div>
        <div className="flex gap-5">
          <Check className="text-primary" /> <span>Relatórios de IA ilimitados</span>
        </div>
        <div className="flex gap-5">
          <Check className="text-primary" /> <span>...</span>
        </div>

        <Button className="mt-3 rounded-full" onClick={handleBuyPremiumPlanClick}>
          Adquirir Pro
        </Button>
      </div>

      {/* <Badge className="absolute left-10 top-10 w-fit bg-primary/20 px-4 text-base font-semibold text-primary">
        Atual
      </Badge> */}
    </Card>
  )
}
