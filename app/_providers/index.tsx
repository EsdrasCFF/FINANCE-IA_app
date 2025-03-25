'use client'

import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}
export function Providers({ children }: Props) {
  const queryClient = new QueryClient()

  return (
    <>
      <ClerkProvider appearance={{ baseTheme: dark }}>
        <QueryClientProvider client={queryClient}>
          <NuqsAdapter>{children}</NuqsAdapter>
        </QueryClientProvider>
      </ClerkProvider>
    </>
  )
}
