import { Category } from '@prisma/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { CategoryFormData } from '@/app/_validation/categories/add-categories-validator'

interface IResponseType {
  category: Category[]
}

interface IRequestType {
  josn: CategoryFormData
}

export function useAddCategory() {
  const queryClient = useQueryClient()

  const mutate = useMutation<IResponseType, Error, IRequestType>({
    mutationFn: async () => {
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.status != 201) {
        throw new Error('Failed to create category during fetch /api/categories - POST"')
      }

      const data = await response.json()

      return data
    },
    onError: (err) => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      toast.error('Ocorreu um erro ao criar Cateria, tente mais tarde!')
      console.error('Error to create category:', err)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      toast.success('Categoria criada com sucesso!')
    },
  })
  return mutate
}
