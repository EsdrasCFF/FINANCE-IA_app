'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { ReactNode } from 'react'

import { Toaster } from '../_components/ui/sonner'
interface Props {
  children: ReactNode
}
export function Providers({ children }: Props) {
  const queryClient = new QueryClient()

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <NuqsAdapter>{children}</NuqsAdapter>
      </QueryClientProvider>
      <Toaster />
    </>
  )
}
