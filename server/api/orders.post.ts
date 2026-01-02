import { neon } from '@neondatabase/serverless'

const databaseUrl = process.env.DATABASE_URL

if (!databaseUrl) {
  throw createError({
    statusCode: 500,
    statusMessage: 'Database URL missing for orders handler'
  })
}

// Create a single Neon client for this Lambda/worker runtime
const sql = neon(databaseUrl)

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

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
        total_cents
      ) values (
        ${body.customer_name},
        ${body.email},
        ${body.phone},
        ${body.location_id},
        ${body.location_label},
        ${body.quantity},
        ${body.size},
        ${body.cottage_type},
        ${body.standard_brand},
        ${body.base_price_cents},
        ${JSON.stringify(body.toppings ?? [])}::jsonb,
        ${body.preset_key},
        ${body.total_cents}
      )
      returning *
    `

    return { success: true, data: rows }
  } catch (error) {
    console.error('Neon insert error (orders):', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to save order'
    })
  }
})
