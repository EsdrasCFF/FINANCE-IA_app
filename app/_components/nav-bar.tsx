'use client'

import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

export function NavBar() {
  const pathname = usePathname()

  const searchParams = useSearchParams()

  const month = searchParams.get('month')

  const queryParams = month ? `?month=${month}` : ''

  const links = [
    {
      href: `/${queryParams}`,
      label: 'Dashboard',
      pathname: '/',
    },
    {
      href: `/transactions${queryParams}`,
      label: 'Transações',
      pathname: '/transactions',
    },
    {
      href: `/categories${queryParams}`,
      label: 'Categorias',
      pathname: '/categories',
    },
    {
      href: `/subscription${queryParams}`,
      label: 'Assinatura',
      pathname: '/subscription',
    },
  ]

  return (
    <nav className="fixed top-0 z-50 mx-8 flex h-full max-h-[72px] w-full items-center justify-between border-b bg-background px-5 py-4">
      {/* LEFT SIDE */}
      <div className="flex items-center gap-12">
        <Link href={`/${queryParams}`}>
          <Image src="/logo.svg" width={173} height={39} alt="Logo" />
        </Link>

        {pathname != '/login' &&
          links.map((link) => (
            <Link
              href={link.href}
              key={link.href}
              className={
                pathname == link.pathname ? 'font-bold text-primary' : 'text-muted-foreground'
              }
            >
              {link.label}
            </Link>
          ))}
      </div>

      {/* RIGHT SIDE */}
      <UserButton showName />
    </nav>
  )
}
