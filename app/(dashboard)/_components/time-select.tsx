'use client'

import { differenceInMonths, format } from 'date-fns'
import { useQueryState } from 'nuqs'
import { useEffect, useState } from 'react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/_components/ui/select'
import { generateMonths } from '@/app/_lib/utils'

export function TimeSelect() {
  const [month, setMonth] = useQueryState('month')

  console.log(month)

  const today = new Date()

  const [selectedMonth, setSelectedMonth] = useState<string>(format(today, 'yyyy-MM'))

  const distanceInMonths = differenceInMonths(selectedMonth, today)

  const [months, setMonths] = useState(generateMonths(distanceInMonths))

  function handleSelectValueChange(value: string) {
    setSelectedMonth(value)
    setMonth(value)
  }

  useEffect(() => {
    setMonths(generateMonths(distanceInMonths))
  }, [selectedMonth, distanceInMonths])

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
