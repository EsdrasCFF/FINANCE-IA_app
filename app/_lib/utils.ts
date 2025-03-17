import { type ClassValue, clsx } from 'clsx'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertFromHundredUnitsToAmount(value: number) {
  return value / 100
}

export function convertFromAmountToHundredUnits(value: number) {
  return value * 100
}

export function formatCurrency(value: number) {
  const amount = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })

  return amount.format(value)
}

export function formatDateToCompleteLabel(date: Date) {
  const newDate = format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
  return newDate
}
