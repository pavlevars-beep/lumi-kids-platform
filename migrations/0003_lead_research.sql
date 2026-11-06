-- Polja iz istraživanja leadova + skor verovatnoće pristanka (veći = pre kontaktirati)
ALTER TABLE leads ADD COLUMN priority TEXT;
ALTER TABLE leads ADD COLUMN score INTEGER NOT NULL DEFAULT 0;
ALTER TABLE leads ADD COLUMN region TEXT;
ALTER TABLE leads ADD COLUMN sector TEXT;
ALTER TABLE leads ADD COLUMN channel TEXT;
ALTER TABLE leads ADD COLUMN program TEXT;
ALTER TABLE leads ADD COLUMN package TEXT;
ALTER TABLE leads ADD COLUMN reason TEXT;
ALTER TABLE leads ADD COLUMN evidence_url TEXT;
ALTER TABLE leads ADD COLUMN linkedin TEXT;
ALTER TABLE leads ADD COLUMN contact_url TEXT;
ALTER TABLE leads ADD COLUMN score_why TEXT;
CREATE INDEX IF NOT EXISTS idx_leads_score ON leads (score DESC);
