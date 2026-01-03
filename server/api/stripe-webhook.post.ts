import { neon } from '@neondatabase/serverless'
import Stripe from 'stripe'
import { readRawBody, getHeader } from 'h3'

const databaseUrl = process.env.DATABASE_URL

if (!databaseUrl) {
  throw createError({
    statusCode: 500,
    statusMessage: 'Database URL missing for Stripe webhook handler'
  })
}

const sql = neon(databaseUrl)

const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

if (!stripeSecretKey || !webhookSecret) {
  throw createError({
    statusCode: 500,
    statusMessage: 'Stripe environment variables missing for webhook handler'
  })
}

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2024-06-20'
})

export default defineEventHandler(async (event) => {
  const rawBody = await readRawBody(event)
  const sig = getHeader(event, 'stripe-signature')

  if (!rawBody || !sig) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing Stripe signature or body'
    })
  }

  let stripeEvent: Stripe.Event

  try {
    stripeEvent = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret)
  } catch (err) {
    console.error('Stripe webhook signature verification failed', err)
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid Stripe signature'
    })
  }

  try {
    if (stripeEvent.type === 'checkout.session.completed') {
      const session = stripeEvent.data.object as Stripe.Checkout.Session
      const orderId = session.metadata?.order_id
      const donationId = session.metadata?.donation_id
      const paymentIntentId = session.payment_intent
        ? session.payment_intent.toString()
        : null
      const sessionId = session.id

      if (orderId) {
        await sql`
          update orders
          set status = 'paid',
              stripe_session_id = ${sessionId},
              stripe_payment_intent_id = ${paymentIntentId}
          where id = ${orderId}
        `
      } else if (donationId) {
        await sql`
          update donations
          set status = 'paid',
              stripe_session_id = ${sessionId},
              stripe_payment_intent_id = ${paymentIntentId}
          where id = ${donationId}
        `
      }
    }

    return { received: true }
  } catch (error) {
    console.error('Stripe webhook processing error', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to process Stripe webhook'
    })
  }
})
