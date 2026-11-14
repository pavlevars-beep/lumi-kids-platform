-- Praćenje reakcija na mejlove (Resend webhook): otvaranja i klikovi
ALTER TABLE leads ADD COLUMN opens INTEGER NOT NULL DEFAULT 0;
ALTER TABLE leads ADD COLUMN clicks INTEGER NOT NULL DEFAULT 0;
ALTER TABLE leads ADD COLUMN last_opened_at TEXT;
ALTER TABLE leads ADD COLUMN last_clicked_at TEXT;
CREATE INDEX IF NOT EXISTS idx_leads_engagement ON leads (clicks DESC, opens DESC);
CREATE TABLE IF NOT EXISTS email_events (
  svix_id    TEXT PRIMARY KEY,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  type       TEXT NOT NULL,
  email_id   TEXT,
  lead_id    INTEGER
);
