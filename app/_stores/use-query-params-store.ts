import { format } from 'date-fns'
import { create } from 'zustand'

interface QueryParamsStoreProps {
  month: string
  setNewMonth: (month: string) => void
}

const today = new Date()
const defaultMonth = format(today, 'yyyy-MM')

export const useQueryParamsStore = create<QueryParamsStoreProps>((set) => ({
  month: defaultMonth,
  setNewMonth: (month) => set({ month }),
}))
