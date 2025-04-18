/* eslint-disable @typescript-eslint/no-unused-vars  */

'use client'

import { differenceInMonths, format } from 'date-fns'
import { Options } from 'nuqs'
import { useState } from 'react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/_components/ui/select'
import { generateMonths } from '@/app/_lib/utils'
import { useQueryParamsStore } from '@/app/_stores/use-query-params-store'

interface Props {
  setMonth: (
    value: string | ((old: string | null) => string | null) | null,
    options?: Options | undefined
  ) => Promise<URLSearchParams>
  month: string | null
}

export function TimeSelect({ setMonth, month }: Props) {
  const today = new Date()

  const [selectedMonth, setSelectedMonth] = useState<string>(month ?? format(today, 'yyyy-MM'))

  const distanceInMonths = differenceInMonths(selectedMonth, today)

  const [months, setMonths] = useState(generateMonths(distanceInMonths))

  const { setNewMonth } = useQueryParamsStore()

  function handleSelectValueChange(value: string) {
    setSelectedMonth(value)
    setMonth(value)
    setMonths(generateMonths(distanceInMonths))
    setNewMonth(value)
  }

  return (
    <Select onValueChange={handleSelectValueChange} value={selectedMonth}>
      <SelectTrigger className="w-fit min-w-[130px]">
        <SelectValue placeholder="Selecione um mês" />
      </SelectTrigger>
      <SelectContent>
        {months.map(({ value, label }) => (
          <SelectItem key={value} value={value}>
            <p className="capitalize">{label}</p>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
