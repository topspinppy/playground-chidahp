import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Validate required environment variables
if (!supabaseUrl) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable. Please add it to your .env.local file.');
}

if (!supabaseAnonKey) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable. Please add it to your .env.local file.');
}

// Export createClient function for API routes
export { createClient } from '@supabase/supabase-js';

// Client for client-side operations
// After validation above, we know these are defined
export const supabase = createClient(supabaseUrl!, supabaseAnonKey!);

// Admin client for server-side operations (bypasses RLS)
export const supabaseAdmin = supabaseServiceKey 
  ? createClient(supabaseUrl!, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
  : null;

// Helper function for API routes
export function createSupabaseClient() {
  return createClient(supabaseUrl!, supabaseAnonKey!);
}

// Database types
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          name: string;
          email: string;
          password: string;
          role: 'admin' | 'writer' | 'reviewer';
          status: 'active' | 'inactive' | 'suspended';
          last_login: string | null;
          wordpress_user_id: number | null;
          profile: {
            bio?: string;
            social_media?: {
              facebook?: string;
              instagram?: string;
              twitter?: string;
              tiktok?: string;
            };
            writing_experience?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
            motivation?: string;
          };
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          password: string;
          role?: 'admin' | 'writer' | 'reviewer';
          status?: 'active' | 'inactive' | 'suspended';
          last_login?: string | null;
          wordpress_user_id?: number | null;
          profile?: {
            bio?: string;
            social_media?: {
              facebook?: string;
              instagram?: string;
              twitter?: string;
              tiktok?: string;
            };
            writing_experience?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
            motivation?: string;
          };
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          password?: string;
          role?: 'admin' | 'writer' | 'reviewer';
          status?: 'active' | 'inactive' | 'suspended';
          last_login?: string | null;
          wordpress_user_id?: number | null;
          profile?: {
            bio?: string;
            social_media?: {
              facebook?: string;
              instagram?: string;
              twitter?: string;
              tiktok?: string;
            };
            writing_experience?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
            motivation?: string;
          };
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}

export type User = Database['public']['Tables']['users']['Row'];
export type UserInsert = Database['public']['Tables']['users']['Insert'];
export type UserUpdate = Database['public']['Tables']['users']['Update'];
