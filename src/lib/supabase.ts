import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Client for client-side operations
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Admin client for server-side operations (bypasses RLS)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

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
