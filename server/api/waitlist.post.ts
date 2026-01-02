import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseAnonKey = process.env.SUPABASE_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw createError({
    statusCode: 500,
    statusMessage: 'Supabase credentials missing for waitlist handler'
  })
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

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

  const { data, error } = await supabase
    .from('waitlist')
    .insert({
      email,
      source,
      created_at: new Date().toISOString()
    })
    .select()

  if (error) {
    console.error('Supabase waitlist insert error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to save waitlist signup'
    })
  }

  return { success: true, data }
}
)
