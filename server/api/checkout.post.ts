import { neon } from '@neondatabase/serverless'
import Stripe from 'stripe'
import { getRequestURL } from 'h3'

const databaseUrl = process.env.DATABASE_URL

if (!databaseUrl) {
  throw createError({
    statusCode: 500,
    statusMessage: 'Database URL missing for checkout handler'
  })
}

const sql = neon(databaseUrl)

const stripeSecretKey = process.env.STRIPE_SECRET_KEY

if (!stripeSecretKey) {
  throw createError({
    statusCode: 500,
    statusMessage: 'Stripe secret key missing for checkout handler'
  })
}

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2024-06-20'
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const {
    customer_name,
    email,
    phone,
    location_id,
    location_label,
    quantity,
    size,
    cottage_type,
    standard_brand,
    base_price_cents,
    toppings,
    preset_key,
    total_cents
  } = body || {}

  if (!customer_name || !email || !phone) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required customer fields'
    })
  }

  const qty = Number.isFinite(Number(quantity)) ? Number(quantity) : 1
  const totalCents = Number(total_cents)

  if (!Number.isFinite(totalCents) || totalCents <= 0 || totalCents > 50000) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid order total'
    })
  }

  try {
    const rows = await sql`
      insert into orders (
        customer_name,
        email,
        phone,
        location_id,
        location_label,
        quantity,
        size,
        cottage_type,
        standard_brand,
        base_price_cents,
        toppings,
        preset_key,
        total_cents,
        status
      ) values (
        ${customer_name},
        ${email},
        ${phone},
        ${location_id},
        ${location_label},
        ${qty},
        ${size},
        ${cottage_type},
        ${standard_brand},
        ${base_price_cents},
        ${JSON.stringify(toppings ?? [])}::jsonb,
        ${preset_key},
        ${totalCents},
        'pending_payment'
      )
      returning *
    `

    const order = rows[0]

    const requestUrl = getRequestURL(event)
    const origin = requestUrl.origin

    const successUrl = `${origin}/order/confirmed?session_id={CHECKOUT_SESSION_ID}`
    const cancelUrl = `${origin}/order?canceled=true`

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: totalCents,
            product_data: {
              name: 'Cottage Bowls order',
              description: `${order.quantity} bowl(s)  pickup at ${order.location_label}`
            }
          },
          quantity: 1
        }
      ],
      customer_email: email,
      metadata: {
        order_id: String(order.id)
      },
      success_url: successUrl,
      cancel_url: cancelUrl
    })

    await sql`
      update orders
      set stripe_session_id = ${session.id}
      where id = ${order.id}
    `

    return { url: session.url }
  } catch (error) {
    console.error('Checkout error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create checkout session'
    })
  }
})
