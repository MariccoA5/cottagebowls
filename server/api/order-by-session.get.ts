import { neon } from '@neondatabase/serverless'
import { getQuery } from 'h3'

const databaseUrl = process.env.DATABASE_URL

if (!databaseUrl) {
  throw createError({
    statusCode: 500,
    statusMessage: 'Database URL missing for order lookup handler'
  })
}

const sql = neon(databaseUrl)

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const sessionId = (query.session_id || query.sessionId) as string | undefined

  if (!sessionId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'session_id is required'
    })
  }

  try {
    const rows = await sql`
      select *
      from orders
      where stripe_session_id = ${sessionId}
      limit 1
    `

    if (!rows.length) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Order not found'
      })
    }

    const order = rows[0]

    return {
      success: true,
      order
    }
  } catch (error) {
    console.error('Order lookup error', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to load order'
    })
  }
})
