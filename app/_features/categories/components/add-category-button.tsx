'use client'

import { ArrowDownUp } from 'lucide-react'

import { Button } from '@/app/_components/ui/button'

import { useOpenCategoryForm } from '../hooks/use-open-category'
import { AddCategoryDialog } from './add-category-dialog'

export function AddCategoryButton() {
  const { onOpen } = useOpenCategoryForm()

  return (
    <>
      <Button className="rounded-full text-sm font-bold" onClick={onOpen}>
        Adicionar Categoria <ArrowDownUp className="ml-1" />
      </Button>

      <AddCategoryDialog />
    </>
  )
}
