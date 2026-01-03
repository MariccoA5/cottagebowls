import { neon } from '@neondatabase/serverless'
import Stripe from 'stripe'
import { getRequestURL } from 'h3'

const databaseUrl = process.env.DATABASE_URL

if (!databaseUrl) {
  throw createError({
    statusCode: 500,
    statusMessage: 'Database URL missing for donate checkout handler'
  })
}

const sql = neon(databaseUrl)

const stripeSecretKey = process.env.STRIPE_SECRET_KEY

if (!stripeSecretKey) {
  throw createError({
    statusCode: 500,
    statusMessage: 'Stripe secret key missing for donate checkout handler'
  })
}

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2024-06-20'
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const {
    name,
    email,
    phone,
    note,
    amount_cents
  } = body || {}

  if (!email) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email is required for donations'
    })
  }

  const amountCents = Number(amount_cents)

  if (!Number.isFinite(amountCents) || amountCents <= 0 || amountCents > 10000000) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid donation amount'
    })
  }

  try {
    const rows = await sql`
      insert into donations (
        donor_name,
        email,
        phone,
        note,
        amount_cents,
        status
      ) values (
        ${name || null},
        ${email},
        ${phone || null},
        ${note || null},
        ${amountCents},
        'pending_payment'
      )
      returning *
    `

    const donation = rows[0]

    const requestUrl = getRequestURL(event)
    const origin = requestUrl.origin

    const successUrl = `${origin}/donation-confirmed?session_id={CHECKOUT_SESSION_ID}`
    const cancelUrl = `${origin}/support?canceledDonation=true`

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: amountCents,
            product_data: {
              name: 'Support Cottage Bowls – donation',
              description: 'Thank you for supporting our growth in St. George.'
            }
          },
          quantity: 1
        }
      ],
      customer_email: email,
      metadata: {
        donation_id: String(donation.id)
      },
      success_url: successUrl,
      cancel_url: cancelUrl
    })

    await sql`
      update donations
      set stripe_session_id = ${session.id}
      where id = ${donation.id}
    `

    return { url: session.url }
  } catch (error) {
    console.error('Donate checkout error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to start donation checkout'
    })
  }
})
