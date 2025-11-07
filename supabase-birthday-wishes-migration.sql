-- Supabase Migration Script for Birthday Wishes
-- Run this in your Supabase SQL editor to create the required table

-- Create birthday_wishes_p_yaa table
CREATE TABLE IF NOT EXISTS birthday_wishes_p_yaa (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    text TEXT NOT NULL,
    author VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_birthday_wishes_created_at ON birthday_wishes_p_yaa(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE birthday_wishes_p_yaa ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Allow anyone to read birthday wishes
CREATE POLICY "Anyone can view birthday wishes" ON birthday_wishes_p_yaa
    FOR SELECT USING (true);

-- Allow anyone to insert birthday wishes
CREATE POLICY "Anyone can insert birthday wishes" ON birthday_wishes_p_yaa
    FOR INSERT WITH CHECK (true);

