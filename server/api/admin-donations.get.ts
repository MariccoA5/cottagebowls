import { neon } from '@neondatabase/serverless'
import { getQuery } from 'h3'

const databaseUrl = process.env.DATABASE_URL

if (!databaseUrl) {
  throw createError({
    statusCode: 500,
    statusMessage: 'Database URL missing for admin donations handler'
  })
}

const sql = neon(databaseUrl)

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const scope = (query.scope || 'recent').toString() // 'recent' | 'today'
  const limit = Number(query.limit || 100)
  const safeLimit = Number.isFinite(limit) && limit > 0 && limit <= 500 ? limit : 100

  const adminKey = process.env.ADMIN_DASHBOARD_KEY
  const providedKey = event.node.req.headers['x-admin-key'] as string | undefined

  if (adminKey && adminKey.length > 0) {
    if (!providedKey || providedKey !== adminKey) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Unauthorized admin access'
      })
    }
  }

  try {
    let rows

    if (scope === 'today') {
      rows = await sql`
        select *
        from donations
        where status = 'paid'
          and created_at::date = current_date
        order by created_at desc
        limit ${safeLimit}
      `
    } else {
      rows = await sql`
        select *
        from donations
        where status = 'paid'
        order by created_at desc
        limit ${safeLimit}
      `
    }

    return {
      success: true,
      scope,
      count: rows.length,
      donations: rows
    }
  } catch (error) {
    console.error('Admin donations lookup error', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to load admin donations'
    })
  }
})
