'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Category } from '@prisma/client'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { MoneyInput } from '@/app/_components/money-input'
import { Button } from '@/app/_components/ui/button'
import { DatePicker } from '@/app/_components/ui/date-picker'
import { DialogFooter } from '@/app/_components/ui/dialog'
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
import { PAYMENT_METHOD_OPTIONS, TRANSACTION_TYPE_OPTIONS } from '@/app/_constants/transactions'
import {
  EditTransactionFormData,
  editTransactionFormSchema,
} from '@/app/_validation/transactions/edit-transaction-validator'

import { useEditTransaction } from '../api/use-edit-transaction'
import { TransactionWithCategory } from '../api/use-get-transaction'
import { useEditTransactionStore } from '../hooks/use-edit-transaction-store'

interface EditTransactionFormProps {
  transactionData: TransactionWithCategory
  defaultValeus: EditTransactionFormData | undefined
  categories: Category[]
}

export function EditTransactionForm({
  defaultValeus,
  transactionData,
  categories,
}: EditTransactionFormProps) {
  const form = useForm<EditTransactionFormData>({
    resolver: zodResolver(editTransactionFormSchema),
    defaultValues: defaultValeus,
  })

  const { onClose } = useEditTransactionStore()

  const editTransactionMutation = useEditTransaction(transactionData.id)

  const filteredCategories = categories.filter((category) => category.type == transactionData.type)

  const isLoading = form.formState.isSubmitting || editTransactionMutation.isPending

  function onCancelForm() {
    form.reset()
    onClose()
  }

  function handleSubmitForm(data: EditTransactionFormData) {
    editTransactionMutation.mutate(data, {
      onSuccess: () => {
        toast.success('Transação editada com sucesso!')
        onCancelForm()
      },
    })
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmitForm)} className="space-y-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título</FormLabel>
                <FormControl>
                  <Input placeholder="Digite o título..." {...field} disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valor</FormLabel>
                <FormControl>
                  <MoneyInput
                    placeholder="Digite o valor..."
                    onValueChange={({ floatValue }) => field.onChange(floatValue)}
                    value={field.value}
                    onBlur={field.onBlur}
                    disabled={isLoading}
                  />
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
                <Select onValueChange={field.onChange} defaultValue={field.value} disabled>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um tipo de Transação" />
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

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categoria</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={transactionData.categoryId || undefined}
                  disabled={isLoading}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {filteredCategories.map((category) => (
                      <SelectItem value={category.id} key={category.id}>
                        {
                          <p key={category.id} className="capitalize">
                            {category.name.toLocaleLowerCase()}
                          </p>
                        }
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="paymentMethod"
            render={({ field }) => (
              <FormItem>
                <FormLabel>método de Pagamento</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isLoading}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um método de pagamento" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {PAYMENT_METHOD_OPTIONS.map((option) => (
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

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data</FormLabel>
                <DatePicker value={field.value} onChange={field.onChange} disabled={isLoading} />

                <FormMessage />
              </FormItem>
            )}
          />

          <DialogFooter>
            <Button variant="outline" type="button" disabled={isLoading} onClick={onCancelForm}>
              Cancelar
            </Button>

            <Button variant="default" disabled={isLoading}>
              {isLoading && <Loader2 className="ml-2 animate-spin" />} Atualizar
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </>
  )
}
