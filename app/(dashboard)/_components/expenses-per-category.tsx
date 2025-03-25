import { Loader2 } from 'lucide-react'

import { CardContent, CardHeader, CardTitle } from '@/app/_components/ui/card'
import { ScrollArea } from '@/app/_components/ui/scroll-area'
import { Separator } from '@/app/_components/ui/separator'
import { ICategorySummary } from '@/app/_features/dashboard/api/use-get-summary'

import { CategoryDetails } from './category-details'

interface Props {
  categorySummary: ICategorySummary[] | undefined
}

export function ExpensesPerCategory({ categorySummary }: Props) {
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
          {/* <Separator className="mb-6" /> */}
          {!categorySummary && (
            <div className="mt-32 flex h-full w-full items-center justify-center">
              <Loader2 className="animate-spin" />
            </div>
          )}

          {categorySummary &&
            categorySummary.map((data) => <CategoryDetails categorySummary={data} key={data.id} />)}
        </CardContent>
      </ScrollArea>
    </div>
  )
}
