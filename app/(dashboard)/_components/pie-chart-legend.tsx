'use client'

import { ReactNode } from 'react'
import CountUp from 'react-countup'

interface PieChartLegendProps {
  icon: ReactNode
  title: string
  percentage: number
}

export function PieChartLegend({ icon, percentage, title }: PieChartLegendProps) {
  return (
    <div className="flex w-full max-w-[230px] items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="rounded-md bg-muted/50 p-2">{icon}</div>

        <p className="text-sm text-muted-foreground">{title}</p>
      </div>

      <span className="text-sm font-bold">
        {<CountUp start={0} end={percentage} duration={2} suffix="%" />}
      </span>
    </div>
  )
}
