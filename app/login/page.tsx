import { SignInButton } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'
import { LogInIcon } from 'lucide-react'
import Image from 'next/image'
import { redirect } from 'next/navigation'

import { Button } from '../_components/ui/button'

export default async function TransactionPage() {
  const { userId } = await auth()

  if (userId) {
    return redirect('/')
  }

  return (
    <div className="grid h-full grid-cols-2">
      <div className="mx-auto flex h-full w-full max-w-screen-sm flex-col justify-center">
        <Image src="logo.svg" alt="Logo" width={173} height={39} />

        <h1 className="mt-8 text-4xl font-bold">Bem-Vindo(a)</h1>

        <p className="mb-8 mt-3 text-muted-foreground">
          A Finance AI é uma plataforma de gestão financeira que utiliza IA para monitorar suas
          movimentações, e oferecer insights personalizados, facilitando o controle do seu
          orçamento.
        </p>
        <SignInButton>
          <Button variant="outline">
            <LogInIcon className="mr-2" /> Fazer Login ou Criar Conta
          </Button>
        </SignInButton>
      </div>

      <div className="relative h-full w-full">
        <Image src="/login.png" alt="Faça Login" fill className="object-cover" />
      </div>
    </div>
  )
}
