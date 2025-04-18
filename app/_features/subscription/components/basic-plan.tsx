'use client'

import { useUser } from '@clerk/nextjs'
import { Check, X } from 'lucide-react'

import { Badge } from '@/app/_components/ui/badge'
import { Button } from '@/app/_components/ui/button'
import { Card } from '@/app/_components/ui/card'
import { Separator } from '@/app/_components/ui/separator'

interface Props {
  quantity: number
}

export function BasicPlan({ quantity }: Props) {
  const { user } = useUser()

  const hasPremiumPlan = user?.publicMetadata.subscriptionPlan == 'premium'

  return (
    <Card className="relative flex w-full max-w-[450px] flex-col py-10">
      {/* PRINCE AND DESCRIPTION */}
      <div className="flex flex-col items-center justify-center font-semibold">
        <p className="text-2xl">Plano Básico</p>
        <div className="mt-6 flex items-center justify-center gap-3 text-6xl">
          <span className="text-4xl font-normal"> R$ </span>
          <span>0</span>
          <span className="text-2xl font-normal text-muted-foreground">/mês </span>
        </div>
      </div>
      <Separator className="my-10" />
      {/* SERVICES */}
      <div className="flex flex-col gap-4 px-10">
        <div className="flex gap-5">
          <Check className="text-primary" />
          <span>
            Apenas 20 transações por mês
            <span className="font-bold text-primary"> {quantity}</span>/20
          </span>
        </div>
        <div className="flex gap-5">
          <X /> <span>Relatórios de IA ilimitados</span>
        </div>
        <div className="flex gap-5">
          <X /> <span>...</span>
        </div>

        <Button
          variant="outline"
          className="mt-3 rounded-full border border-primary font-bold text-primary"
          disabled={hasPremiumPlan}
        >
          Fazer Upgrade
        </Button>
      </div>

      {!hasPremiumPlan && (
        <Badge className="absolute left-10 top-10 w-fit bg-primary/20 px-4 text-base font-semibold text-primary">
          Atual
        </Badge>
      )}
    </Card>
  )
}
