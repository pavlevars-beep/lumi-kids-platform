-- Upiti pristigli preko forme na sajtu
CREATE TABLE IF NOT EXISTS inquiries (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at    TEXT    NOT NULL DEFAULT (datetime('now')),
  client_type   TEXT    NOT NULL,
  occasion      TEXT,
  organization  TEXT,
  name          TEXT    NOT NULL,
  email         TEXT    NOT NULL,
  phone         TEXT,
  city          TEXT,
  event_date    TEXT,
  kids_count    INTEGER,
  age_groups    TEXT,
  location      TEXT,
  services      TEXT,
  workshops     TEXT,
  budget        TEXT,
  message       TEXT,
  source_page   TEXT,
  status        TEXT    NOT NULL DEFAULT 'novo'
);

CREATE INDEX IF NOT EXISTS idx_inquiries_created ON inquiries (created_at DESC);
