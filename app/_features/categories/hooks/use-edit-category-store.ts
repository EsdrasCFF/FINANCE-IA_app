import { create } from 'zustand'

type EditCategoryStoreProps = {
  id?: string
  isOpen: boolean
  onOpen: (id: string) => void
  onClose: () => void
}

export const useEditCategoryStore = create<EditCategoryStoreProps>((set) => ({
  id: undefined,
  isOpen: false,
  onOpen: (id: string) => set({ isOpen: true, id }),
  onClose: () => set({ isOpen: false }),
}))
