'use client'

import { Loader2 } from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/app/_components/ui/dialog'

import { useGetCategory } from '../api/use-get-category'
import { useEditCategoryStore } from '../hooks/use-edit-category-store'
import { CategoryForm } from './category-form'

export function EditCategoryDialog() {
  const { id, isOpen, onClose } = useEditCategoryStore()

  const getCategoryQuery = useGetCategory(id)

  const isLoading = getCategoryQuery.isLoading

  const categoryData = getCategoryQuery.data

  const defaultValues = categoryData && {
    name: categoryData.name,
    type: categoryData.type,
  }

  function onCloseDialog() {
    onClose()
  }

  return (
    <Dialog onOpenChange={onCloseDialog} open={isOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Categoria</DialogTitle>
          <DialogDescription> Insira as informações abaixo </DialogDescription>
        </DialogHeader>

        {isLoading || !categoryData ? (
          <div className="flex h-[200px] w-full items-center justify-center">
            <Loader2 className="animate-spin" />
          </div>
        ) : (
          <CategoryForm defautValues={defaultValues} id={categoryData.id} />
        )}
      </DialogContent>
    </Dialog>
  )
}
