-- Supabase Migration Script for Articles and Categories System
-- Run this in your Supabase SQL editor to create the required tables

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    parent_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    chidahp_id INTEGER UNIQUE,
    color VARCHAR(7), -- Hex color code
    icon VARCHAR(50), -- Icon name or class
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create articles table
CREATE TABLE IF NOT EXISTS articles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT,
    featured_image VARCHAR(500),
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'pending_review', 'published', 'archived')),
    author_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    tags TEXT[] DEFAULT '{}',
    chidahp_id INTEGER UNIQUE,
    wordpress_url VARCHAR(500),
    seo_title VARCHAR(255),
    seo_description TEXT,
    reading_time INTEGER, -- in minutes
    view_count INTEGER DEFAULT 0,
    like_count INTEGER DEFAULT 0,
    share_count INTEGER DEFAULT 0,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);
CREATE INDEX IF NOT EXISTS idx_categories_parent_id ON categories(parent_id);
CREATE INDEX IF NOT EXISTS idx_categories_chidahp_id ON categories(chidahp_id);
CREATE INDEX IF NOT EXISTS idx_categories_is_active ON categories(is_active);

CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_status ON articles(status);
CREATE INDEX IF NOT EXISTS idx_articles_author_id ON articles(author_id);
CREATE INDEX IF NOT EXISTS idx_articles_category_id ON articles(category_id);
CREATE INDEX IF NOT EXISTS idx_articles_chidahp_id ON articles(chidahp_id);
CREATE INDEX IF NOT EXISTS idx_articles_published_at ON articles(published_at);
CREATE INDEX IF NOT EXISTS idx_articles_created_at ON articles(created_at);
CREATE INDEX IF NOT EXISTS idx_articles_view_count ON articles(view_count);

-- Create trigger to automatically update updated_at for categories
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create trigger to automatically update updated_at for articles
CREATE TRIGGER update_articles_updated_at BEFORE UPDATE ON articles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for categories table
CREATE POLICY "Anyone can view active categories" ON categories
    FOR SELECT USING (is_active = true);

CREATE POLICY "Authenticated users can view all categories" ON categories
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can manage categories" ON categories
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id::text = auth.uid()::text 
            AND role = 'admin'
        )
    );

-- Create RLS policies for articles table
CREATE POLICY "Anyone can view published articles" ON articles
    FOR SELECT USING (status = 'published');

CREATE POLICY "Authors can view their own articles" ON articles
    FOR SELECT USING (author_id::text = auth.uid()::text);

CREATE POLICY "Authors can create articles" ON articles
    FOR INSERT WITH CHECK (author_id::text = auth.uid()::text);

CREATE POLICY "Authors can update their own articles" ON articles
    FOR UPDATE USING (author_id::text = auth.uid()::text);

CREATE POLICY "Authors can delete their own articles" ON articles
    FOR DELETE USING (author_id::text = auth.uid()::text);

CREATE POLICY "Admins can manage all articles" ON articles
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id::text = auth.uid()::text 
            AND role = 'admin'
        )
    );

CREATE POLICY "Reviewers can view and update articles" ON articles
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id::text = auth.uid()::text 
            AND role IN ('admin', 'reviewer')
        )
    );

CREATE POLICY "Reviewers can update article status" ON articles
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id::text = auth.uid()::text 
            AND role IN ('admin', 'reviewer')
        )
    );

-- Insert default categories
INSERT INTO categories (name, slug, description, color, icon, sort_order) VALUES
('เทคโนโลยี', 'technology', 'บทความเกี่ยวกับเทคโนโลยีและนวัตกรรม', '#3B82F6', 'laptop', 1),
('ไลฟ์สไตล์', 'lifestyle', 'บทความเกี่ยวกับไลฟ์สไตล์และการใช้ชีวิต', '#10B981', 'heart', 2),
('การเงิน', 'finance', 'บทความเกี่ยวกับการเงินและการลงทุน', '#F59E0B', 'dollar-sign', 3),
('สุขภาพ', 'health', 'บทความเกี่ยวกับสุขภาพและการดูแลร่างกาย', '#EF4444', 'activity', 4),
('การศึกษา', 'education', 'บทความเกี่ยวกับการศึกษาและการเรียนรู้', '#8B5CF6', 'book-open', 5),
('บันเทิง', 'entertainment', 'บทความเกี่ยวกับบันเทิงและความบันเทิง', '#EC4899', 'music', 6)
ON CONFLICT (slug) DO NOTHING;

-- Create function to generate slug from title
CREATE OR REPLACE FUNCTION generate_slug(title TEXT)
RETURNS TEXT AS $$
BEGIN
    RETURN lower(
        regexp_replace(
            regexp_replace(
                regexp_replace(title, '[^a-zA-Z0-9\s]', '', 'g'),
                '\s+', '-', 'g'
            ),
            '^-+|-+$', '', 'g'
        )
    );
END;
$$ LANGUAGE plpgsql;

-- Create function to calculate reading time
CREATE OR REPLACE FUNCTION calculate_reading_time(content TEXT)
RETURNS INTEGER AS $$
BEGIN
    -- Assume average reading speed of 200 words per minute
    RETURN GREATEST(1, CEIL(length(regexp_replace(content, '<[^>]*>', '', 'g')) / 200));
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-generate slug and reading time
CREATE OR REPLACE FUNCTION auto_generate_article_metadata()
RETURNS TRIGGER AS $$
BEGIN
    -- Generate slug if not provided
    IF NEW.slug IS NULL OR NEW.slug = '' THEN
        NEW.slug = generate_slug(NEW.title);
    END IF;
    
    -- Calculate reading time if not provided
    IF NEW.reading_time IS NULL AND NEW.content IS NOT NULL THEN
        NEW.reading_time = calculate_reading_time(NEW.content);
    END IF;
    
    -- Set published_at when status changes to published
    IF NEW.status = 'published' AND OLD.status != 'published' THEN
        NEW.published_at = NOW();
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER auto_generate_article_metadata_trigger
    BEFORE INSERT OR UPDATE ON articles
    FOR EACH ROW
    EXECUTE FUNCTION auto_generate_article_metadata();
