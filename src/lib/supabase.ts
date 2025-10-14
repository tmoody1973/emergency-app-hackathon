import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

// Check for required environment variables
if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_URL');
}
if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

// Client-side Supabase client (safe to use in browser)
// Uses anon key with Row Level Security
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  }
);

// Server-side Supabase client (use only in API routes and server components)
// Uses service role key with full access - NEVER expose to client
export function getServerSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_KEY;

  if (!supabaseUrl) {
    throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_URL');
  }
  if (!serviceKey) {
    throw new Error('Missing env.SUPABASE_SERVICE_KEY');
  }

  return createClient(
    supabaseUrl,
    serviceKey,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    }
  );
}

// Helper function to handle Supabase errors
export function handleSupabaseError(error: any): string {
  if (error?.message) {
    return error.message;
  }
  return 'An unexpected database error occurred';
}

// Type-safe database helpers
export type Tables = Database['public']['Tables'];
export type Emergency = Tables['emergencies']['Row'];
export type Volunteer = Tables['volunteers']['Row'];
export type Business = Tables['businesses']['Row'];
export type Match = Tables['matches']['Row'];
