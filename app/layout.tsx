import './globals.css'

import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { Mulish } from 'next/font/google'

import { Providers } from './_providers'
import { DialogProvider } from './_providers/dialog-provider'

const mulish = Mulish({
  subsets: ['latin-ext'],
})

export const metadata: Metadata = {
  title: 'Money Tracker',
  description: 'O seu gerenciador de Finanças pessoas e assistente',
  icons: {
    icon: '/favicon.png',
  },
}

const DynamicNavBar = dynamic(() => import('./_components/nav-bar').then((mod) => mod.NavBar), {
  ssr: false,
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <ClerkProvider appearance={{ baseTheme: dark }}>
        <body
          className={`${mulish.className} dark flex w-full flex-col items-center antialiased [&::-webkit-scrollbar]:hidden`}
        >
          <Providers>
            <DynamicNavBar />
            <div className="mt-[72px] flex w-full max-w-screen-xl flex-col">{children}</div>
            <DialogProvider />
          </Providers>
        </body>
      </ClerkProvider>
    </html>
  )
}
