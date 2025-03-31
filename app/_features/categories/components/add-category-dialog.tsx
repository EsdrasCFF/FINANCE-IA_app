'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { Button } from '@/app/_components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/app/_components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/app/_components/ui/form'
import { Input } from '@/app/_components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/_components/ui/select'
import { TRANSACTION_TYPE_OPTIONS } from '@/app/_constants/transactions'
import {
  addCategoryFormSchema,
  CategoryFormData,
} from '@/app/_validation/categories/add-categories-validator'

import { useAddCategory } from '../api/use-add-category'
import { useOpenCategoryForm } from '../hooks/use-open-category'

export function AddCategoryDialog() {
  const form = useForm<CategoryFormData>({
    resolver: zodResolver(addCategoryFormSchema),
    defaultValues: {},
  })

  const { onClose, isOpen } = useOpenCategoryForm()

  const addCategoryMutation = useAddCategory()

  const isLoading = form.formState.isSubmitting || addCategoryMutation.isPending

  function handleSubmitForm(data: CategoryFormData) {
    addCategoryMutation.mutate(data, {
      onSuccess: () => {
        onCloseDialog()
      },
    })
  }

  function onCloseDialog() {
    form.reset()
    onClose()
  }

  function onCancelForm() {
    form.reset()
    onClose()
  }

  return (
    <Dialog onOpenChange={onCloseDialog} open={isOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Categoria</DialogTitle>
          <DialogDescription> Insira as informações abaixo </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmitForm)} className="space-y-5">
            <FormField
              disabled={isLoading}
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome da Categoria</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o nome..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isLoading}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um tipo de Categoria" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {TRANSACTION_TYPE_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button variant="outline" type="button" disabled={isLoading} onClick={onCancelForm}>
                Cancelar
              </Button>

              <Button variant="default" type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="ml-2 animate-spin" />} Adicionar
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
