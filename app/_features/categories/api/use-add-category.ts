import { Category } from '@prisma/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { CategoryFormData } from '@/app/_validation/categories/add-categories-validator'

interface IResponseType {
  category: Category
}

export function useAddCategory() {
  const queryClient = useQueryClient()

  const mutate = useMutation<IResponseType, Error, CategoryFormData>({
    mutationFn: async (json) => {
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(json),
      })

      if (response.status != 201 && response.status != 400) {
        toast.error('Ocorreu um erro ao criar Cateria, tente mais tarde!')
        throw new Error('Failed to create category during fetch /api/categories - POST"')
      }

      const data = await response.json()

      if (data.error) {
        if (data.error.code === 'CT0001') {
          toast.warning('Esta categoria já existe!', { duration: 3000 })
          throw new Error('Category name is already in use')
        }
      }

      return data
    },
    onError: (err) => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      console.error('Error to create category:', err)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      toast.success('Categoria criada com sucesso!')
    },
  })
  return mutate
}
