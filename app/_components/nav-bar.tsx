'use client'

import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function NavBar() {
  const pathname = usePathname()

  const links = [
    {
      href: '/',
      label: 'Dashboard',
    },
    {
      href: '/transactions',
      label: 'Transações',
    },
    {
      href: '/subscription',
      label: 'Assinatura',
    },
    {
      href: '/categories',
      label: 'Categorias',
    },
  ]

  return (
    <nav className="mx-8 flex h-full max-h-[72px] w-full items-center justify-between border-b px-10 py-4">
      {/* LEFT SIDE */}
      <div className="flex items-center gap-12">
        <Link href="/">
          <Image src="/logo.svg" width={173} height={39} alt="Logo" />
        </Link>
        {links.map((link) => (
          <Link
            href={link.href}
            key={link.href}
            className={pathname == link.href ? 'font-bold text-primary' : 'text-muted-foreground'}
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
