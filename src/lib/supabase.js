import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        persistSession: true,          // keep the session in localStorage
        autoRefreshToken: true,        // auto-refresh expired JWTs
        detectSessionInUrl: true,      // pick up tokens from redirect URLs
        storageKey: 'rewear-auth',     // unique key so it never collides
    },
})
