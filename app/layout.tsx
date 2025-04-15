import './globals.css'

import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import type { Metadata } from 'next'
import { Mulish } from 'next/font/google'
import Head from 'next/head'

import { NavBar } from './_components/nav-bar'
import { Providers } from './_providers'
import { DialogProvider } from './_providers/dialog-provider'

const mulish = Mulish({
  subsets: ['latin-ext'],
})

export const metadata: Metadata = {
  title: 'Money Tracker',
  description: 'O seu gerenciador de Finanças pessoas e assistente',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <ClerkProvider appearance={{ baseTheme: dark }}>
        <body
          className={`${mulish.className} dark flex w-full flex-col items-center antialiased [&::-webkit-scrollbar]:hidden`}
        >
          <Providers>
            <NavBar />
            <div className="mt-[72px] flex w-full max-w-screen-xl flex-col">{children}</div>
            <DialogProvider />
          </Providers>
        </body>
      </ClerkProvider>
    </html>
  )
}
