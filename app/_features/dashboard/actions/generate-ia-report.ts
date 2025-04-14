'use server'

import { auth } from '@clerk/nextjs/server'
import OpenAI from 'openai'

import { getMonthRange } from '@/app/_lib/utils'

import { getTransactions } from '../../transactions/actions/get-transactions'

export async function generateIaReport(month: string) {
  const { userId } = await auth()

  if (!userId) {
    throw new Error('Unauthorized')
  }

  // TODO: Check if user has premium plan

  const charGtp = new OpenAI({
    apiKey: process.env.OPEN_IA_KEY as string,
  })

  const period = getMonthRange(month)

  const transactions = await getTransactions(period, userId)
  // get transactions

  const content = `Gere um relatório com insights sobre as minhas finanças, com dicas e orientações de como melhorar minha vida financeira. As transações estão divididas por ponto e vírgula. A estrutura de cada uma é {DATA}-{TIPO}-{VALOR}-{CATEGORIA}. São elas:
  ${transactions
    .map(
      (transaction) =>
        `${transaction.date.toLocaleDateString('pt-BR')}-R$${transaction.amount}-${transaction.type}-${transaction.category}`
    )
    .join(';')}`

  const completion = await charGtp.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content:
          'Você é um especialista em gestão e organização de finanças, conselheiro e assistente. Você ajuda pessoas a melhor ligar e organizar as finaças pessoais',
      },
      {
        role: 'user',
        content,
      },
    ],
  })

  const reponse = completion.choices[0].message.content

  return reponse
  // send transactions to the charGtp
}
