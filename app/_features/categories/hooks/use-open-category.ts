import { create } from 'zustand'

type OpenCategoryFormProps = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const useOpenCategoryForm = create<OpenCategoryFormProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))
