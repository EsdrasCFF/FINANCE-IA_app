import { Category } from '@prisma/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { EditCategoryFormData } from '@/app/_validation/categories/edit-category-validator'

interface IResponseType {
  category: Category
}

export function useEditCategory(id: string) {
  const queryClient = useQueryClient()

  const mutate = useMutation<IResponseType, Error, EditCategoryFormData>({
    mutationFn: async (json) => {
      const response = await fetch(`/api/categories/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(json),
      })

      if (response.status != 200 && response.status != 404) {
        toast.error('Ocorreu um erro ao editar Cateria, tente mais tarde!')
        throw new Error('Failed to edit category during fetch /api/categories/id - "PUT"')
      }

      const data = await response.json()

      if (data.error) {
        if (data.error.code === 'CT0003') {
          toast.warning('Categoria não encontrada!', { duration: 3000 })
          throw new Error('Category not found')
        }
      }

      return data
    },
    onError: (err) => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      console.error('Error to create category:', err)
    },
    onMutate: (json) => {
      const getPrevData: { categories: Category[] } | undefined = queryClient.getQueryData([
        'categories',
      ])
      if (!getPrevData) return

      const newCategories = getPrevData.categories.map((category) => {
        if (category.id != id) {
          return category
        }

        return {
          ...category,
          name: json.name,
        }
      })

      queryClient.setQueryData(['categories'], { categories: newCategories })
    },
    onSuccess: () => {
      toast.success('Categoria editada com sucesso!')
    },
  })
  return mutate
}
