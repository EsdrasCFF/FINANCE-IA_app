import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

import { DataTable } from '../_components/ui/data-table'
import { AddCategoryButton } from '../_features/categories/components/add-category-button'
import { db } from '../_lib/prisma'
import { categorieColumns } from './_columns'

export default async function CategoriesPage() {
  const { userId } = await auth()

  if (!userId) {
    return redirect('/login')
  }

  const categories = await db.category.findMany({ where: { userId } })

  return (
    <div className="space-y-6 px-6 pb-6">
      <div className="mt-5 flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Categorias</h1>
        <AddCategoryButton categories={categories} />
      </div>

      <DataTable columns={categorieColumns} data={categories} />
    </div>
  )
}
