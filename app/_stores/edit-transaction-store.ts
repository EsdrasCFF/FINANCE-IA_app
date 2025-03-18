import { create } from 'zustand'

interface EditTransactionStoreProps {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const useEditTransactionStore = create<EditTransactionStoreProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))
