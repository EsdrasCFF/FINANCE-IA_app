import './globals.css'

import type { Metadata } from 'next'
import { Mulish } from 'next/font/google'

import { NavBar } from './_components/nav-bar'
import { Providers } from './_providers'

const mulish = Mulish({
  subsets: ['latin-ext'],
})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <Providers>
        <body
          className={`${mulish.className} dark mb-5 flex max-h-screen min-h-screen w-full flex-col items-center antialiased`}
        >
          <NavBar />
          <div
            className="flex h-full w-full max-w-screen-xl flex-col"
            style={{ minHeight: 'calc(100vh - 72px)' }}
          >
            {children}
          </div>
        </body>
      </Providers>
    </html>
  )
}
