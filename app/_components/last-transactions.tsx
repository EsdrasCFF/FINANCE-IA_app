'use client'

import { Transaction } from '@prisma/client'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'

import { TransactionDetails } from './transaction-details'
import { Button } from './ui/button'
import { CardContent, CardHeader, CardTitle } from './ui/card'
import { ScrollArea } from './ui/scroll-area'
import { Separator } from './ui/separator'

interface Props {
  transactions: Transaction[] | undefined
}

export function LastTransactions({ transactions }: Props) {
  return (
    <div className="flex h-full w-full flex-col">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Transações</CardTitle>

        <Button variant="outline" asChild className="rounded-full px-4">
          <Link href="/transactions"> Ver mais </Link>
        </Button>
      </CardHeader>

      <div className="mb-6 px-6">
        <Separator />
      </div>
      <ScrollArea className="h-full max-h-[880px] overflow-hidden">
        <CardContent className="w-full">
          {!transactions && (
            <div className="h-full w-full">
              <Loader2 className="animate-spin" />
            </div>
          )}

          {transactions && (
            <div className="flex flex-col">
              {transactions.map((transaction) => (
                <TransactionDetails transaction={transaction} key={transaction.id} />
              ))}
            </div>
          )}
        </CardContent>
      </ScrollArea>
    </div>
  )
}
