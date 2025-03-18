'use client'

import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { CalendarIcon } from 'lucide-react'
import * as React from 'react'
import { SelectSingleEventHandler } from 'react-day-picker'

import { cn } from '@/app/_lib/utils'

import { Button } from './button'
import { Calendar } from './calendar'
import { Popover, PopoverContent, PopoverTrigger } from './popover'

interface DatePickerProps {
  value?: Date
  onChange?: SelectSingleEventHandler
}

export function DatePicker({ value, onChange }: DatePickerProps) {
  // const [date, setDate] = React.useState<Date>()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-full justify-start text-left font-normal',
            !value && 'text-muted-foreground'
          )}
        >
          <CalendarIcon />
          {value ? format(value, 'PPP', { locale: ptBR }) : <span>Selecione uma data...</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="single" selected={value} onSelect={onChange} initialFocus locale={ptBR} />
      </PopoverContent>
    </Popover>
  )
}
