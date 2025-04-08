/* eslint-disable @typescript-eslint/no-explicit-any */

import { clerkClient } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

export async function POST(request: Request) {
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.error()
  }

  const text = await request.text()

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2025-02-24.acacia',
  })

  const event = stripe.webhooks.constructEvent(
    text,
    signature,
    process.env.STRIPE_WEBHOOK as string
  )

  const client = await clerkClient()

  switch (event.type) {
    case 'invoice.paid': {
      const invoice = event.data.object as Stripe.Invoice
      const parent = (invoice as any).parent

      const subscriptionId = parent?.subscription_details?.subscription

      if (!subscriptionId) {
        console.warn('Missing subscription Id')
        return NextResponse.json({ error: { message: 'STP0001' } })
      }

      const subscription = await stripe.subscriptions.retrieve(subscriptionId)
      const clerkUserId = subscription.metadata.clerk_user_id

      if (!clerkUserId) {
        console.warn('clerk_user_id not found inside metada')
        return NextResponse.json({ error: { message: 'STP0002' } })
      }

      await client.users.updateUser(clerkUserId, {
        privateMetadata: {
          stripeCustomerId: invoice.customer,
          stripeSbscriptionId: subscription,
        },
        publicMetadata: {
          subscriptionPlan: 'premium',
        },
      })
    }
    case 'customer.subscription.deleted': {
      const subscription = await stripe.subscriptions.retrieve(event.data.object.id)

      const clerkUserId = subscription.metadata.clerk_user_id

      if (!clerkUserId) {
        console.warn('clerk_user_id not found inside metada')
        return NextResponse.json({ error: { message: 'STP0002' } })
      }

      await client.users.updateUser(clerkUserId, {
        privateMetadata: {
          stripeCustomerId: null,
          stripeSbscriptionId: null,
        },
        publicMetadata: {
          subscriptionPlan: 'basic',
        },
      })
    }
  }

  return NextResponse.json({}, { status: 200 })
}
