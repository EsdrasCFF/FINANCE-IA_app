'use client'

import { Category } from '@prisma/client'
import {
  DollarSign,
  Eye,
  EyeOff,
  PiggyBankIcon,
  TrendingDown,
  TrendingUp,
  WalletIcon,
} from 'lucide-react'
import { useQueryState } from 'nuqs'
import { useState } from 'react'
import CountUp from 'react-countup'

import { AddTransactionButton } from '@/app/_components/add-transaction-button'
import { Card, CardContent, CardHeader } from '@/app/_components/ui/card'
import { useGetSummary } from '@/app/_features/dashboard/api/use-get-summary'
import { formatCurrency, generateDefaultMonth } from '@/app/_lib/utils'
import { LastTransactions } from '@/app/(dashboard)/_components/last-transactions'

import { ExpensesPerCategory } from './expenses-per-category'
import { SummaryCard } from './summary-card'
import { TimeSelect } from './time-select'
import { TransactionsPieChart } from './transactions-pie-chart'

interface Props {
  categories: Category[]
}

export function FinanceOverview({ categories }: Props) {
  const [month, setMonth] = useQueryState('month')

  const defaultMonth = generateDefaultMonth()

  const [isViewBalance, setIsViewBalance] = useState(false)

  const getSummaryQuery = useGetSummary(month || defaultMonth)

  const result = getSummaryQuery.data?.summary || {
    DEPOSIT: 0,
    INVESTMENT: 0,
    EXPENSE: 0,
    transactionPercentages: { expense: 0, investment: 0, deposit: 0 },
  }

  const categoriesSummary = getSummaryQuery.data?.categorySummary

  const cardProps = [
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
    {
      icon: <PiggyBankIcon size={16} className="text-indigo-700" />,
      title: 'Investido',
      amount: result.INVESTMENT,
      style: 'bg-indigo-800/40  ',
    },
    {
      icon: <DollarSign size={16} />,
      title: 'Saldo Mês',
      amount: result.DEPOSIT - (result.EXPENSE + result.INVESTMENT),
      style: 'bg-muted-foreground/40',
    },
  ]

  const lastTransactions = getSummaryQuery.data?.transactions

  const totalBalance = getSummaryQuery.data?.balance || 0

  const isLoading = getSummaryQuery.isLoading

  return (
    <div className="mb-6 flex h-[880px] w-full flex-col">
      <div className="flex h-[80px] w-full items-center justify-between py-5">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <TimeSelect setMonth={setMonth} month={month} />
      </div>
      {/* grid max-h-[500px] min-h-[500px] flex-1 grid-cols-[2fr,1fr] gap-6 */}
      <div className="flex h-[800px] max-h-[800px] min-h-[800px] w-full gap-6">
        <div className="flex w-full flex-col gap-6">
          <Card className="h-[146px] w-full bg-muted">
            <CardHeader className="flex flex-row gap-2">
              <div className="w-fit rounded-md bg-background p-2">
                <WalletIcon size={16} />
              </div>
              <p className="text-muted-foreground">Saldo Atual</p>
            </CardHeader>

            <CardContent className="flex w-full justify-between">
              <div className="flex items-center gap-5">
                {isViewBalance ? (
                  <p className="text-4xl font-bold">
                    <CountUp
                      start={0}
                      end={totalBalance}
                      formattingFn={formatCurrency}
                      decimals={2}
                      decimalPlaces={2}
                    />
                  </p>
                ) : (
                  <div className="flex min-h-[40px] min-w-[210px] max-w-[210px] items-center justify-center rounded-md bg-muted-foreground/20" />
                )}

                <button
                  className="h-[40px] w-fit rounded-md"
                  onClick={() => setIsViewBalance(!isViewBalance)}
                >
                  {isViewBalance ? <Eye size={30} /> : <EyeOff size={30} />}
                </button>
              </div>
              <AddTransactionButton categories={categories} />
            </CardContent>
          </Card>

          <div className="grid h-[138px] grid-cols-4 gap-6">
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

          <div className="flex h-[470px] w-full gap-6">
            <div className="h-full min-w-[270px]">
              <TransactionsPieChart
                expenseTotal={result.EXPENSE}
                depositTotal={result.DEPOSIT}
                investmentTotal={result.INVESTMENT}
                transactionPercentages={result.transactionPercentages}
                isLoading={isLoading}
              />
            </div>

            <Card className="h-full w-full overflow-hidden">
              <ExpensesPerCategory categorySummary={categoriesSummary} isLoading={isLoading} />
            </Card>
          </div>
        </div>

        <Card className="h-full min-w-[400px] rounded-lg">
          <LastTransactions transactions={lastTransactions} isLoading={isLoading} />
        </Card>
      </div>
    </div>
  )
}
