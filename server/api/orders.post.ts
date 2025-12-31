import { createClient } from '@supabase/supabase-js'
// import type { Database } from '~/types/supabase' // Optional: for better typing later

// Type assertion + runtime guard
const supabaseUrl = process.env.SUPABASE_URL
const supabaseAnonKey = process.env.SUPABASE_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw createError({
    statusCode: 500,
    statusMessage: 'Supabase credentials missinggg'
  })
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const { data, error } = await supabase
    .from('orders')
    .insert(body)
    .select() // optional: returns inserted row

  if (error) {
    console.error('Supabase insert error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to save order'
    })
  }

  return { success: true, data }
})
