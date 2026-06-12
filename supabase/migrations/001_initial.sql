-- LumiKids Studio — ispravna shema usklađena sa TypeScript tipovima

-- Workshops tabela
CREATE TABLE IF NOT EXISTS workshops (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  topic_category TEXT NOT NULL CHECK (topic_category IN (
    'Music','Reading','Speech Therapy','Mini Science Kitchen',
    'Photography','Architecture','Dance','Acting','Other'
  )),
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME,
  age_group TEXT NOT NULL,
  short_summary TEXT NOT NULL DEFAULT '',
  full_description TEXT NOT NULL DEFAULT '',
  learning_goals TEXT,
  location TEXT,
  capacity INTEGER,
  price NUMERIC,
  workshop_icon_url TEXT,
  featured_image_type TEXT NOT NULL DEFAULT 'upload' CHECK (featured_image_type IN ('preset','upload')),
  featured_image_url TEXT,
  preset_image_key TEXT,
  video_explainer_url TEXT,
  registration_form_url TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('published','draft')),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Workshop gallery slike
CREATE TABLE IF NOT EXISTS workshop_gallery_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  workshop_id UUID NOT NULL REFERENCES workshops(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Articles tabela
CREATE TABLE IF NOT EXISTS articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL CHECK (category IN (
    'Parenting','Child Development','Emotions & Behavior',
    'Creativity','Talent Exploration','Studio News','Other'
  )),
  featured_image_type TEXT NOT NULL DEFAULT 'upload' CHECK (featured_image_type IN ('preset','upload')),
  featured_image_url TEXT,
  preset_image_key TEXT,
  excerpt TEXT NOT NULL DEFAULT '',
  body TEXT NOT NULL DEFAULT '',
  author TEXT NOT NULL DEFAULT 'LumiKids Studio',
  publish_date DATE,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('published','draft')),
  tags TEXT[] NOT NULL DEFAULT '{}',
  is_premium BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Indeksi
CREATE INDEX IF NOT EXISTS workshops_slug_idx ON workshops(slug);
CREATE INDEX IF NOT EXISTS workshops_status_idx ON workshops(status);
CREATE INDEX IF NOT EXISTS workshops_date_idx ON workshops(date);
CREATE INDEX IF NOT EXISTS articles_slug_idx ON articles(slug);
CREATE INDEX IF NOT EXISTS articles_status_idx ON articles(status);

-- Row Level Security
ALTER TABLE workshops ENABLE ROW LEVEL SECURITY;
ALTER TABLE workshop_gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- Javni korisnici mogu čitati objavljene radionice
CREATE POLICY "Public read published workshops"
  ON workshops FOR SELECT USING (status = 'published');

-- Ulogovani admini mogu sve
CREATE POLICY "Authenticated manage workshops"
  ON workshops FOR ALL TO authenticated
  USING (true) WITH CHECK (true);

-- Gallery
CREATE POLICY "Public read gallery"
  ON workshop_gallery_images FOR SELECT USING (true);

CREATE POLICY "Authenticated manage gallery"
  ON workshop_gallery_images FOR ALL TO authenticated
  USING (true) WITH CHECK (true);

-- Javni korisnici mogu čitati objavljene tekstove
CREATE POLICY "Public read published articles"
  ON articles FOR SELECT USING (status = 'published');

CREATE POLICY "Authenticated manage articles"
  ON articles FOR ALL TO authenticated
  USING (true) WITH CHECK (true);

-- Automatski updated_at
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
