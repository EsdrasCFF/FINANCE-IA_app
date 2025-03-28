import { type ClassValue, clsx } from 'clsx'
import { endOfMonth, format, parse, startOfMonth, subMonths } from 'date-fns'
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

export function generateMonths(distanteInMonth: number) {
  if (distanteInMonth > -12 && distanteInMonth < 0) {
    const distance = distanteInMonth * -1

    const months = Array.from({ length: 11 + distance }, (_, i) => {
      const date = subMonths(new Date(), i)
      return {
        value: format(date, 'yyyy-MM'), // Exemplo: "2025-03"
        label: format(date, "MMMM'/'yy", { locale: ptBR }),
      }
    })

    return months
  }

  if (distanteInMonth < -12) {
    const distance = distanteInMonth * -1 + 6

    const months = Array.from({ length: distance }, (_, i) => {
      const date = subMonths(new Date(), i)
      return {
        value: format(date, 'yyyy-MM'), // Exemplo: "2025-03"
        label: format(date, "MMMM'/'yy", { locale: ptBR }),
      }
    })

    return months
  }

  const generateMonths = Array.from({ length: 12 }, (_, i) => {
    const date = subMonths(new Date(), i)
    return {
      value: format(date, 'yyyy-MM'), // Exemplo: "2025-03"
      label: format(date, "MMMM'/'yy", { locale: ptBR }), // Exemplo: "Março/25"
    }
  })

  return generateMonths
}

export function getMonthRange(month: string) {
  const date = parse(month, 'yyyy-MM', new Date()) // Converte "2025-02" para um Date
  const firstDay = format(startOfMonth(date), 'yyyy-MM-dd') // Primeiro dia do mês
  const lastDay = format(endOfMonth(date), 'yyyy-MM-dd') // Último dia do mês

  return { firstDay, lastDay }
}

export function getMonthRangeNow() {
  const now = new Date() // Garante que estamos lidando com um Date válido

  const firstDay = format(startOfMonth(now), 'yyyy-MM-dd')
  const lastDay = format(endOfMonth(now), 'yyyy-MM-dd')

  return { firstDay, lastDay }
}

export function generateDefaultMonth() {
  const today = new Date()

  const month = format(today, 'yyyy-MM')

  return month
}
