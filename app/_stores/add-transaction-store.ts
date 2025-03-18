import { create } from 'zustand'

interface AddTransactionStoreProps {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const useAddTransactionStore = create<AddTransactionStoreProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))
