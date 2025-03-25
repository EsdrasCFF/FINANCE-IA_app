'use client'

import { Category } from '@prisma/client'
import { PiggyBankIcon, TrendingDown, TrendingUp, WalletIcon } from 'lucide-react'
import { useQueryState } from 'nuqs'
import CountUp from 'react-countup'

import { AddTransactionButton } from '@/app/_components/add-transaction-button'
import { LastTransactions } from '@/app/_components/last-transactions'
import { Card, CardContent, CardHeader } from '@/app/_components/ui/card'
import { useGetSummary } from '@/app/_features/dashboard/api/use-get-summary'
import { formatCurrency } from '@/app/_lib/utils'

import { ExpensesPerCategory } from './expenses-per-category'
import { SummaryCard } from './summary-card'
import { TimeSelect } from './time-select'
import { TransactionsPieChart } from './transactions-pie-chart'

interface Props {
  categories: Category[]
}

export function FinanceOverview({ categories }: Props) {
  const [month, setMonth] = useQueryState('month')

  const getSummaryQuery = useGetSummary(month)

  const result = getSummaryQuery.data?.summary || {
    DEPOSIT: 0,
    INVESTMENT: 0,
    EXPENSE: 0,
    transactionPercentages: { expense: 0, investment: 0, deposit: 0 },
  }

  const categoriesSummary = getSummaryQuery.data?.categorySummary

  const cardProps = [
    {
      icon: <PiggyBankIcon size={16} />,
      title: 'Investido',
      amount: result.INVESTMENT,
      style: 'bg-muted-foreground/40',
    },
    {
      icon: <TrendingUp size={16} className="text-customGreen" />,
      title: 'Receitas',
      amount: result.DEPOSIT,
      style: 'bg-customGreen/15',
    },
    {
      icon: <TrendingDown size={16} className="text-customRed" />,
      title: 'Despesas',
      amount: result.EXPENSE,
      style: 'bg-customRed/15',
    },
  ]

  const lastTransactions = getSummaryQuery.data?.transactions

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex w-full justify-between py-5">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <TimeSelect setMonth={setMonth} />
      </div>

      <div className="grid h-full max-h-full min-h-full grid-cols-[2fr,1fr] gap-6">
        <div className="flex h-full min-h-full flex-col gap-6">
          <Card className="w-full bg-muted">
            <CardHeader className="flex flex-row gap-2">
              <div className="w-fit rounded-md bg-background p-2">
                <WalletIcon size={16} />
              </div>
              <p className="text-muted-foreground">Saldo</p>
            </CardHeader>

            <CardContent className="flex w-full justify-between">
              <p className="text-4xl font-bold">
                <CountUp
                  start={0}
                  end={result.DEPOSIT - (result.EXPENSE + result.INVESTMENT)}
                  formattingFn={formatCurrency}
                  decimals={2}
                  decimalPlaces={2}
                />
              </p>
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

          <div className="grid h-full grid-cols-3 gap-6">
            <TransactionsPieChart
              expenseTotal={result.EXPENSE}
              depositTotal={result.DEPOSIT}
              investmentTotal={result.INVESTMENT}
              transactionPercentages={result.transactionPercentages}
            />

            <Card className="col-span-2 h-full overflow-hidden">
              <ExpensesPerCategory categorySummary={categoriesSummary} />
            </Card>
          </div>
        </div>

        <Card className="h-full min-h-full rounded-lg">
          <LastTransactions transactions={lastTransactions} />
        </Card>
      </div>
    </div>
  )
}
