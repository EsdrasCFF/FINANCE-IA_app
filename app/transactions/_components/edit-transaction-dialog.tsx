'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Category, PaymentMethod, TransactionType } from '@prisma/client'
import { Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { getGategories } from '@/app/_actions/categories/get-categories'
import { editTransaction } from '@/app/_actions/transactions/edit-transaction'
import { MoneyInput } from '@/app/_components/money-input'
import { Button } from '@/app/_components/ui/button'
import { DatePicker } from '@/app/_components/ui/date-picker'
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
import { PAYMENT_METHOD_OPTIONS, TRANSACTION_TYPE_OPTIONS } from '@/app/_constants/transactions'
import { convertFromHundredUnitsToAmount } from '@/app/_lib/utils'

import { TransactionWithCategoryProps } from '../_columns'

export const addTransactionFormSchema = z.object({
  name: z.string().trim().min(3, { message: 'O nome é obrigatório!' }),
  amount: z
    .number({ required_error: 'Valor é obrigatório!' })
    .positive({ message: 'O valor precisa ser positivo' }),
  type: z.nativeEnum(TransactionType),
  category: z.string({ required_error: '' }).trim().min(3, { message: 'Categoria é obrigatório!' }),
  paymentMethod: z.nativeEnum(PaymentMethod, {
    required_error: 'Método de pagamento é obrigatório',
  }),
  date: z.date({
    required_error: 'Data é obrigatória!',
  }),
})

export type EditTransactionFormSchemaData = z.infer<typeof addTransactionFormSchema>

interface EditTransactionsDialogProps {
  transaction: TransactionWithCategoryProps
  openDialog: boolean
  onOpen: () => void
  onClose: () => void
}

export function EditTransactionDialog({
  transaction,
  onClose,
  openDialog,
}: EditTransactionsDialogProps) {
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<EditTransactionFormSchemaData>({
    resolver: zodResolver(addTransactionFormSchema),
    defaultValues: {
      name: transaction.name,
      amount: convertFromHundredUnitsToAmount(transaction.amount),
      category: transaction.categoryId as string,
      date: transaction.date,
      paymentMethod: transaction.paymentMethod,
      type: transaction.type,
    },
  })

  const selectedTransactionType = form.watch('type')

  const filteredCategories = categories.filter(
    (category) => category.type == selectedTransactionType
  )

  const isSubmitting = form.formState.isSubmitting

  async function handleSubmitForm(data: EditTransactionFormSchemaData) {
    try {
      await editTransaction({ ...data, transactionId: transaction.id })
      onClose()
      form.reset()
    } catch (err) {
      console.error('An error occurred while updating the transaction in the database:', err)
    }
  }

  function onCloseDialog() {
    form.reset()
    onClose()
  }

  function onCancelForm() {
    form.reset()
    onClose()
  }

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true)
      const categories = await getGategories()
      setCategories(categories)
      setIsLoading(false)
    }

    fetchCategories()
  }, [])

  return (
    <Dialog onOpenChange={onCloseDialog} open={openDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Transação</DialogTitle>
          <DialogDescription> Insira as informações abaixo </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          {isLoading ? (
            <div className="flex h-[500px] items-center justify-center">
              <Loader2 className="animate-spin" />
            </div>
          ) : (
            <form onSubmit={form.handleSubmit(handleSubmitForm)} className="space-y-5">
              <FormField
                disabled={isLoading}
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite o título..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                disabled={isLoading}
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
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                disabled={isLoading}
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                disabled={isLoading}
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoria</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={transaction.categoryId || undefined}
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
                disabled={isLoading}
                control={form.control}
                name="paymentMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>método de Pagamento</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                disabled={isLoading}
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data</FormLabel>
                    <DatePicker value={field.value} onChange={field.onChange} />

                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button
                  variant="outline"
                  type="button"
                  disabled={isSubmitting}
                  onClick={onCancelForm}
                >
                  Cancelar
                </Button>

                <Button variant="default" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="ml-2 animate-spin" />} Atualizar
                </Button>
              </DialogFooter>
            </form>
          )}
        </Form>
      </DialogContent>
    </Dialog>
  )
}
