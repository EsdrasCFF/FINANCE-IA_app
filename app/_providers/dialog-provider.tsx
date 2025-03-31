import { EditCategoryDialog } from '../_features/categories/components/edit-category-dialog'
import { EditTransactionDialog } from '../_features/transactions/components/edit-transaction-dialog'

export function DialogProvider() {
  return (
    <>
      <EditTransactionDialog />
      <EditCategoryDialog />
    </>
  )
}
