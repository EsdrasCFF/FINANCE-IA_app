import { Loader2 } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/app/_components/ui/card'
import { ScrollArea } from '@/app/_components/ui/scroll-area'
import { Separator } from '@/app/_components/ui/separator'
import { ICategorySummary } from '@/app/_features/dashboard/api/use-get-summary'

import { CategoryDetails } from './category-details'

interface Props {
  categorySummary: ICategorySummary[] | undefined
}

export function ExpensesPerCategory({ categorySummary }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle> Gastos por categoria </CardTitle>
      </CardHeader>

      <CardContent className="w-full">
        <Separator className="mb-6" />
        <ScrollArea className="h-[400px] w-full">
          {!categorySummary && (
            <div className="h-[100px] w-[full]">
              <Loader2 className="animate-spin" />
            </div>
          )}

          {categorySummary &&
            categorySummary.map((data) => <CategoryDetails categorySummary={data} key={data.id} />)}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
