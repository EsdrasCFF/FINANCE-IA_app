import { ReactNode } from 'react'

import { Card, CardContent,CardHeader } from '@/app/_components/ui/card'
import { cn } from '@/app/_lib/utils'

interface SummaryCardProps {
  icon: ReactNode
  title: string
  amount: string
  style: string
}

export function SummaryCard({ icon, title, amount, style }: SummaryCardProps) {
  return (
    <Card
      className={cn('w-full', style != 'bg-muted-foreground/40' ? 'bg-background' : 'bg-muted/50')}
    >
      <CardHeader className="flex flex-row gap-2">
        <div className={cn('w-fit rounded-md p-2', style)}>{icon}</div>
        <p className="text-muted-foreground">{title}</p>
      </CardHeader>

      <CardContent>
        <p className="text-2xl font-bold">{amount}</p>
      </CardContent>
    </Card>
  )
}
