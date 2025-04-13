'use client'

import { DataTable } from '@/app/_components/ui/data-table'
import { categorieColumns } from '@/app/categories/_columns'

import { useGetCategories } from '../api/use-get-categories'

export function MainArea() {
  const getCategories = useGetCategories()

  const categories = getCategories.data?.categories || []

  const isLoading = getCategories.isLoading

  return (
    <main className="h-full w-full space-y-6">
      <DataTable
        columns={categorieColumns}
        data={categories}
        isLoading={isLoading}
        page="categories"
      />
    </main>
  )
}
