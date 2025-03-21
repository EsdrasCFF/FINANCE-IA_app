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

interface Props {
  setMonth: (
    value: string | ((old: string | null) => string | null) | null,
    options?: Options | undefined
  ) => Promise<URLSearchParams>
}

export function TimeSelect({ setMonth }: Props) {
  const today = new Date()

  const [selectedMonth, setSelectedMonth] = useState<string>(format(today, 'yyyy-MM'))

  const distanceInMonths = differenceInMonths(selectedMonth, today)

  const [months, _] = useState(generateMonths(distanceInMonths))

  function handleSelectValueChange(value: string) {
    setSelectedMonth(value)
    setMonth(value)
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
