'use client'

import { TransactionType } from '@prisma/client'
import { PiggyBankIcon, TrendingDown, TrendingUp } from 'lucide-react'
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

  return (
    <Card className="flex flex-col">
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="amount" nameKey="type" innerRadius={65} />
          </PieChart>
        </ChartContainer>
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
