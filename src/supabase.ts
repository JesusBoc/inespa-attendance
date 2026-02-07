import { createClient, SupabaseClient } from '@supabase/supabase-js'
import type { Database } from './database.types.js'

export const supabase = createClient<Database>(
  'https://yevjbrmjozwojillyllu.supabase.co',
  'sb_publishable_zMrjLcF6IukXn-FYZ2w-zA_E4Elg8cm'
)
