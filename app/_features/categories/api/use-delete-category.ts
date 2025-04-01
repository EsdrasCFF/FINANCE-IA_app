import { Category } from '@prisma/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

interface IResponseType {
  category: Category
}

interface IRequestType {
  id: string
  month: string
}

export function useDeleteCategory() {
  const queryClient = useQueryClient()

  const mutate = useMutation<IResponseType, Error, IRequestType>({
    mutationFn: async (json) => {
      const response = await fetch(`/api/categories/${json.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.status != 200 && response.status != 404) {
        toast.error('Ocorreu um erro ao deletar Categoria, tente mais tarde!')
        throw new Error('Failed to edit category during fetch /api/categories/id - "DELETE" ')
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
      console.error('Error to delete category category:', err)
    },
    onMutate: (json) => {
      const getPrevData: { categories: Category[] } | undefined = queryClient.getQueryData([
        'categories',
      ])
      if (!getPrevData) return

      const newCategories = getPrevData.categories.filter((category) => category.id != json.id)

      queryClient.setQueryData(['categories'], { categories: newCategories })
    },
    onSuccess: (_, json) => {
      toast.success('Categoria deletada com sucesso!')
      queryClient.invalidateQueries({ queryKey: ['transactions', json.month] })
    },
  })
  return mutate
}
