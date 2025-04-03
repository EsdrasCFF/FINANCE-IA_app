'use client'

import { TransactionType } from '@prisma/client'
import { ChartPie, Loader2, PiggyBankIcon,TrendingDown, TrendingUp } from 'lucide-react'
import { Pie, PieChart } from 'recharts'

import { Card, CardContent, CardFooter } from '@/app/_components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/app/_components/ui/chart'

import { PieChartLegend } from './pie-chart-legend'

const chartConfig = {
  INVESTMENT: {
    label: 'Investido',
    color: '#FFFFFF',
  },
  DEPOSIT: {
    label: 'Receita',
    color: '#55B02E',
  },
  EXPENSE: {
    label: 'Despesa',
    color: '#E93030',
  },
} satisfies ChartConfig

interface TransactionsPieChartProps {
  isLoading: boolean
  expenseTotal: number
  investmentTotal: number
  depositTotal: number
  transactionPercentages: {
    expense: number
    deposit: number
    investment: number
  }
}

export function TransactionsPieChart({
  depositTotal,
  expenseTotal,
  investmentTotal,
  transactionPercentages,
  isLoading,
}: TransactionsPieChartProps) {
  const chartData = [
    { type: TransactionType.DEPOSIT, amount: depositTotal, fill: '#55B02E' },
    { type: TransactionType.EXPENSE, amount: expenseTotal, fill: '#E93030' },
    { type: TransactionType.INVESTMENT, amount: investmentTotal, fill: '#FFFFFF' },
  ]

  const pieChartLegendData = [
    {
      icon: <PiggyBankIcon size={17} />,
      title: 'Investimentos',
      percentage: transactionPercentages.investment,
    },
    {
      icon: <TrendingUp size={17} className="text-customGreen" />,
      title: 'Receitas',
      percentage: transactionPercentages.deposit,
    },
    {
      icon: <TrendingDown size={17} className="text-customRed" />,
      title: 'Despesas',
      percentage: transactionPercentages.expense,
    },
  ]

  const hasData = chartData.reduce((acc, cur) => (acc += cur.amount), 0) > 0 ? true : false

  return (
    <Card className="flex h-full flex-col">
      <CardContent className="flex-1 pt-10">
        {isLoading && !hasData && (
          <div className="flex h-full w-full items-center justify-center">
            <Loader2 className="animate-spin" />
          </div>
        )}
        {!isLoading && hasData && (
          <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
            <PieChart>
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Pie data={chartData} dataKey="amount" nameKey="type" innerRadius={65}></Pie>
            </PieChart>
          </ChartContainer>
        )}

        {!isLoading && !hasData && (
          <div className="flex h-full w-full items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-4">
              <ChartPie size={40} />
              <span className="text-xs">Não há dados no período</span>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex-col gap-3 text-sm">
        {pieChartLegendData.map((legendData) => (
          <PieChartLegend
            icon={legendData.icon}
            percentage={legendData.percentage}
            title={legendData.title}
            key={legendData.title}
          />
        ))}
      </CardFooter>
    </Card>
  )
}
