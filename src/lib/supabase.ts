import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL  = 'https://pmxnpavgkblgqjfqpbpc.supabase.co'
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBteG5wYXZna2JsZ3FqZnFwYnBjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg2NjAyNTMsImV4cCI6MjA5NDIzNjI1M30.BPwtJ2SRrRJRriyMxWIbTiEaPDmWZS4Teljcof8H5Ws'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON)

export const FUNCTIONS_URL = `${SUPABASE_URL}/functions/v1`
