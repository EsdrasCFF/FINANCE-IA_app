import { Category } from '@prisma/client'
import { PiggyBankIcon, TrendingDown, TrendingUp, WalletIcon } from 'lucide-react'

import { getSummary } from '@/app/_actions/dashboard/get-summary'
import { AddTransactionButton } from '@/app/_components/add-transaction-button'
import { Card, CardContent, CardHeader } from '@/app/_components/ui/card'
import { formatCurrency } from '@/app/_lib/utils'

import { SummaryCard } from './summary-card'

interface Props {
  categories: Category[]
}

export async function SummaryCards({ categories }: Props) {
  const result = await getSummary()

  const cardProps = [
    {
      icon: <PiggyBankIcon size={16} />,
      title: 'Investido',
      amount: formatCurrency(result.INVESTMENT),
      style: 'bg-muted-foreground/40',
    },
    {
      icon: <TrendingUp size={16} className="text-customGreen" />,
      title: 'Receitas',
      amount: formatCurrency(result.DEPOSIT),
      style: 'bg-customGreen/15',
    },
    {
      icon: <TrendingDown size={16} className="text-customRed" />,
      title: 'Despesas',
      amount: formatCurrency(result.EXPENSE),
      style: 'bg-customRed/15',
    },
  ]

  return (
    <div className="w-full space-y-6">
      <Card className="w-full bg-muted">
        <CardHeader className="flex flex-row gap-2">
          <div className="w-fit rounded-md bg-background p-2">
            <WalletIcon size={16} />
          </div>
          <p className="text-muted-foreground">Saldo</p>
        </CardHeader>

        <CardContent className="flex w-full justify-between">
          <p className="text-4xl font-bold">R$ 2.700</p>
          <AddTransactionButton categories={categories} />
        </CardContent>
      </Card>

      <div className="grid grid-cols-3 gap-6">
        {cardProps.map((inf) => (
          <SummaryCard
            amount={inf.amount}
            icon={inf.icon}
            title={inf.title}
            key={inf.title}
            style={inf.style}
          />
        ))}
      </div>
    </div>
  )
}
