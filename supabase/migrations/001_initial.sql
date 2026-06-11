-- LumiKids Studio - Initial Database Schema

-- Workshops table
CREATE TABLE IF NOT EXISTS workshops (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL DEFAULT '',
  short_description TEXT NOT NULL DEFAULT '',
  age_group TEXT NOT NULL CHECK (age_group IN ('3-5', '6-8', '9-12')),
  category TEXT NOT NULL CHECK (category IN ('art', 'music', 'science', 'movement', 'language', 'math')),
  duration_minutes INTEGER NOT NULL DEFAULT 60,
  capacity INTEGER NOT NULL DEFAULT 12,
  price_rsd INTEGER NOT NULL DEFAULT 0,
  image_url TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('published', 'draft')),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Articles table
CREATE TABLE IF NOT EXISTS articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT '',
  image_url TEXT NOT NULL DEFAULT '',
  tags TEXT[] NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('published', 'draft')),
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Indexes
CREATE INDEX IF NOT EXISTS workshops_slug_idx ON workshops(slug);
CREATE INDEX IF NOT EXISTS workshops_status_idx ON workshops(status);
CREATE INDEX IF NOT EXISTS workshops_age_group_idx ON workshops(age_group);
CREATE INDEX IF NOT EXISTS workshops_category_idx ON workshops(category);
CREATE INDEX IF NOT EXISTS articles_slug_idx ON articles(slug);
CREATE INDEX IF NOT EXISTS articles_status_idx ON articles(status);
CREATE INDEX IF NOT EXISTS articles_published_at_idx ON articles(published_at);

-- RLS Policies
ALTER TABLE workshops ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- Public read for published content
CREATE POLICY "Public can view published workshops"
  ON workshops FOR SELECT
  USING (status = 'published');

CREATE POLICY "Authenticated users can manage workshops"
  ON workshops FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Public can view published articles"
  ON articles FOR SELECT
  USING (status = 'published');

CREATE POLICY "Authenticated users can manage articles"
  ON articles FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Updated at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER workshops_updated_at
  BEFORE UPDATE ON workshops
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER articles_updated_at
  BEFORE UPDATE ON articles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
