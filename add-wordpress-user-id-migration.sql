-- Migration: Add wordpress_user_id column to users table
-- Run this in your Supabase SQL editor

-- Add wordpress_user_id column to users table
ALTER TABLE users 
ADD COLUMN wordpress_user_id INTEGER NULL;

-- Add comment to the column
COMMENT ON COLUMN users.wordpress_user_id IS 'WordPress user ID for synced users';

-- Create index for better performance when querying by WordPress user ID
CREATE INDEX idx_users_wordpress_user_id ON users(wordpress_user_id);

-- Optional: Add constraint to ensure wordpress_user_id is unique when not null
-- ALTER TABLE users 
-- ADD CONSTRAINT unique_wordpress_user_id UNIQUE (wordpress_user_id);
