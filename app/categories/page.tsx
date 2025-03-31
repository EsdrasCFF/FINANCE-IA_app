import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

import { AddCategoryButton } from '../_features/categories/components/add-category-button'
import { MainArea } from '../_features/categories/components/main-area'

export default async function CategoriesPage() {
  const { userId } = await auth()

  if (!userId) {
    return redirect('/login')
  }

  return (
    <div className="space-y-6 px-6 pb-6">
      <div className="mt-5 flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Categorias</h1>
        <AddCategoryButton />
      </div>

      <MainArea />
    </div>
  )
}
