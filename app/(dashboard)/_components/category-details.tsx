import CountUp from 'react-countup'

import { Progress } from '@/app/_components/ui/progress'
import { ICategorySummary } from '@/app/_features/dashboard/api/use-get-summary'
import { formatCurrency } from '@/app/_lib/utils'

interface Props {
  categorySummary: ICategorySummary
}

export function CategoryDetails({ categorySummary }: Props) {
  return (
    <div className="mb-4 flex w-full flex-col text-sm">
      <div className="mb-1 flex justify-between text-sm font-bold">
        <p>{categorySummary.name}</p>
        <span>
          <CountUp start={0} end={categorySummary.percentage} suffix="%" duration={2} />
        </span>
      </div>

      <Progress value={categorySummary.percentage} />

      <p className="mb-1 font-semibold text-muted-foreground">
        {formatCurrency(categorySummary.totalAmount)}
      </p>
    </div>
  )
}
