import { Category } from '@prisma/client'
import { create } from 'zustand'

type UseSaveCategoriesType = {
  categories: Category[]
  setCategories: (categories: Category[]) => void
}

export const useSaveCategoriesStore = create<UseSaveCategoriesType>((set) => ({
  categories: [],
  setCategories: (categories) => set({ categories }),
}))
