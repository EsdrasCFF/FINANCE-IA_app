import { type ClassValue, clsx } from 'clsx'
import { format, subMonths } from 'date-fns'
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
