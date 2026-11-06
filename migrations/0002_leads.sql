-- Leadovi (firme, vrtići, institucije...) i istorija aktivnosti za prodaju
CREATE TABLE IF NOT EXISTS leads (
  id                INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at        TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at        TEXT NOT NULL DEFAULT (datetime('now')),
  company           TEXT NOT NULL,
  segment           TEXT NOT NULL DEFAULT 'firma',
  city              TEXT,
  website           TEXT,
  employees         TEXT,
  contact_name      TEXT,
  contact_role      TEXT,
  email             TEXT,
  phone             TEXT,
  source            TEXT NOT NULL DEFAULT 'rucno',
  status            TEXT NOT NULL DEFAULT 'za_kontakt',
  value_rsd         INTEGER,
  next_action_at    TEXT,
  notes             TEXT,
  marketing_consent INTEGER NOT NULL DEFAULT 0,
  inquiry_id        INTEGER REFERENCES inquiries(id)
);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads (status);
CREATE INDEX IF NOT EXISTS idx_leads_next ON leads (next_action_at);
CREATE UNIQUE INDEX IF NOT EXISTS idx_leads_email ON leads (email) WHERE email IS NOT NULL AND email <> '';

CREATE TABLE IF NOT EXISTS activities (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  lead_id     INTEGER NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  created_at  TEXT NOT NULL DEFAULT (datetime('now')),
  kind        TEXT NOT NULL,           -- napomena | mejl | poziv | status | upit
  subject     TEXT,
  body        TEXT,
  meta        TEXT
);
CREATE INDEX IF NOT EXISTS idx_activities_lead ON activities (lead_id, created_at DESC);

-- Postojeći upiti postaju leadovi
INSERT INTO leads (company, segment, city, contact_name, email, phone, source, status, notes, marketing_consent, inquiry_id, created_at)
SELECT COALESCE(NULLIF(organization, ''), name), 'firma', city, name, email, phone, 'sajt', 'novo', message, 0, id, created_at
FROM inquiries WHERE email NOT IN (SELECT email FROM leads WHERE email IS NOT NULL);
