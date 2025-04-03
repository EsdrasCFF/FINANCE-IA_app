import { ChartBar, Loader2 } from 'lucide-react'

import { CardContent, CardHeader, CardTitle } from '@/app/_components/ui/card'
import { ScrollArea } from '@/app/_components/ui/scroll-area'
import { Separator } from '@/app/_components/ui/separator'
import { ICategorySummary } from '@/app/_features/dashboard/api/use-get-summary'

import { CategoryDetails } from './category-details'

interface Props {
  categorySummary: ICategorySummary[] | undefined
  isLoading: boolean
}

export function ExpensesPerCategory({ categorySummary, isLoading }: Props) {
  const hasData = categorySummary != undefined ? categorySummary : []

  return (
    <div className="flex h-full w-full flex-col">
      <CardHeader>
        <CardTitle> Gastos por categoria </CardTitle>
      </CardHeader>

      <div className="mb-6 px-6">
        <Separator />
      </div>

      <ScrollArea className="h-full w-full pb-4">
        <CardContent className="flex h-full w-full flex-col">
          {isLoading && (
            <div className="mt-32 flex h-full w-full items-center justify-center">
              <Loader2 className="animate-spin" />
            </div>
          )}

          {!isLoading && hasData.length < 1 && (
            <div className="mt-28 flex h-full w-full items-center justify-center">
              <div className="flex flex-col items-center justify-center gap-4">
                <ChartBar size={40} />
                <span className="text-xs">Não há dados no período</span>
              </div>
            </div>
          )}

          {hasData.length > 0 &&
            hasData.map((data) => <CategoryDetails categorySummary={data} key={data.id} />)}
        </CardContent>
      </ScrollArea>
    </div>
  )
}
