/* eslint-disable @typescript-eslint/no-unused-vars */

import { MoreHorizontal, PencilIcon, TrashIcon } from 'lucide-react'

import { Button } from '@/app/_components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/app/_components/ui/dropdown-menu'
import { useConfirm } from '@/app/_features/transactions/hooks/use-confirm'
import { useQueryParamsStore } from '@/app/_stores/use-query-params-store'

import { useDeleteCategory } from '../api/use-delete-category'
import { useEditCategoryStore } from '../hooks/use-edit-category-store'

interface ActionsControlProps {
  id: string
}

export function ActionsControl({ id }: ActionsControlProps) {
  const { onOpen } = useEditCategoryStore()

  const { month } = useQueryParamsStore()

  const deleteCategoryMutation = useDeleteCategory()

  const isLoading = deleteCategoryMutation.isPending

  const [ConfirmationDialog, confirm, handleClose] = useConfirm(
    'Você tem certeza?',
    'Gostaria de deletar essa categoria',
    isLoading
  )

  async function handleDeleteCategoryClick() {
    const ok = await confirm()

    if (ok) {
      deleteCategoryMutation.mutate(
        { id, month },
        {
          onSuccess: () => {
            handleClose()
          },
        }
      )
    }
  }

  return (
    <>
      <ConfirmationDialog />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 bg-muted/40 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem className="hover:cursor-pointer" onClick={() => onOpen(id)}>
            <PencilIcon className="mr-3" /> Editar
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:cursor-pointer" onClick={handleDeleteCategoryClick}>
            <TrashIcon className="mr-3" /> Deletar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
