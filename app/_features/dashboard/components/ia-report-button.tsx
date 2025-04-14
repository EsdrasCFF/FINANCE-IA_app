'use client'

import { useUser } from '@clerk/nextjs'
import { BotIcon, Loader2 } from 'lucide-react'
import { useState } from 'react'
import Markdown from 'react-markdown'
import { toast } from 'sonner'

import { Button } from '@/app/_components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/app/_components/ui/dialog'
import { ScrollArea } from '@/app/_components/ui/scroll-area'
import { useQueryParamsStore } from '@/app/_stores/use-query-params-store'

import { generateIaReport } from '../actions/generate-ia-report'

export function IaReportButton() {
  const [report, setReport] = useState<string | null>(null)

  const { month } = useQueryParamsStore()

  const [isLoading, setIsLoading] = useState(false)
  const [noPremiumPlan, setNoPremiumPlan] = useState(false)
  const { user } = useUser()

  const hasPremiumPlan = user?.publicMetadata.subscriptionPlan == 'premium'

  async function handleGenerateReportClick() {
    setIsLoading(true)

    if (!hasPremiumPlan) {
      toast.error(
        'Você não tem plano premium! Assine para ter acesso aos relatórios personalizados sobre suas finanças.'
      )
      setNoPremiumPlan(true)
      setIsLoading(false)
      return
    }

    const response = await generateIaReport(month)

    if (!response) {
      toast.error('Erro ao buscar relatório')
      setIsLoading(false)
      return
    }

    setReport(response)
    setIsLoading(false)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="font-bold" variant="ghost">
          Relatório IA <BotIcon className="ml-1" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle> Relatório IA </DialogTitle>
          <DialogDescription>
            Use inteligência artifical para obter insights sobre as suas finanças
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="prose max-h-[450px] text-white prose-h3:text-white prose-h4:text-white prose-strong:text-white">
          {report && <Markdown>{report}</Markdown>}
          {noPremiumPlan && (
            <p className="my-2">
              Você não tem acesso ao plano Premium, por isso não será possível ter relatórios e
              insights personalizados sobre suas finanças.
            </p>
          )}
        </ScrollArea>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost" className="font-bold" disabled={isLoading}>
              {report ? 'Sair' : 'Cancelar'}
            </Button>
          </DialogClose>

          {!report && (
            <Button disabled={isLoading || noPremiumPlan} onClick={handleGenerateReportClick}>
              {isLoading && <Loader2 className="mr-1 animate-spin" />} Gerar Relatório
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
