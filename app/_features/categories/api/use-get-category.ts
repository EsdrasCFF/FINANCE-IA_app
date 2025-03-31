import { Category } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'

export function useGetCategory(id: string | undefined) {
  const query = useQuery<Category>({
    queryKey: ['categories', id],
    queryFn: async () => {
      const response = await fetch(`/api/categories/${id}`, {
        method: 'GET',
      })

      if (response.status != 200) {
        throw new Error(`Error to fetch category '/api/categories/${id}}'`)
      }

      const data = await response.json()

      return data
    },
    enabled: !!id,
  })

  return query
}
