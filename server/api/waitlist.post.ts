import { neon } from '@neondatabase/serverless'

const databaseUrl = process.env.DATABASE_URL

if (!databaseUrl) {
  throw createError({
    statusCode: 500,
    statusMessage: 'Database URL missing for waitlist handler'
  })
}

const sql = neon(databaseUrl)

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const email = (body?.email || '').toString().trim()
  const source = (body?.source || 'unknown').toString()

  if (!email) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email is required'
    })
  }

  try {
    const rows = await sql`
      insert into waitlist (email, source)
      values (${email}, ${source})
      returning *
    `

    return { success: true, data: rows }
  } catch (error) {
    console.error('Neon insert error (waitlist):', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to save waitlist signup'
    })
  }
})
