import { Category } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'

interface IResponseType {
  categories: Category[]
}

export function useGetCategories() {
  const query = useQuery<IResponseType>({
    queryFn: async () => {
      const response = await fetch('/api/categories')

      if (response.status != 200) {
        throw new Error('Occurred an erro to get catgories on query-hook')
      }

      const data = await response.json()

      return data
    },
    queryKey: ['categories'],
  })

  return query
}
