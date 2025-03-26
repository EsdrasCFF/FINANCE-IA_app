import { MoreHorizontal, PencilIcon, TrashIcon } from 'lucide-react'

import { Button } from '@/app/_components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/app/_components/ui/dropdown-menu'
import { useEditTransactionStore } from '@/app/_features/transactions/hooks/use-edit-transaction-store'

interface ActionsControlProps {
  id: string
}

export function ActionsControl({ id }: ActionsControlProps) {
  const { onOpen } = useEditTransactionStore()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 bg-muted/40 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className="hover:cursor-pointer">
          <TrashIcon className="mr-3" /> Deletar
        </DropdownMenuItem>
        <DropdownMenuItem className="hover:cursor-pointer" onClick={() => onOpen(id)}>
          <PencilIcon className="mr-3" /> Editar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
