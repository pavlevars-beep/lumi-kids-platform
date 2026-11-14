// POST /api/resend-webhook — Resend javlja šta se desilo sa poslatim mejlovima.
// Potpis se proverava (Svix format) tajnom RESEND_WEBHOOK_SECRET.
import type { Env } from './lib';

type ResendEvent = {
  type: string;
  created_at?: string;
  data?: {
    email_id?: string;
    to?: string[] | string;
    subject?: string;
    tags?: Record<string, string> | { name: string; value: string }[];
    click?: { link?: string };
    bounce?: { message?: string; type?: string };
  };
};

const enc = new TextEncoder();

async function verify(secret: string, id: string, ts: string, body: string, sigHeader: string) {
  if (Math.abs(Date.now() / 1000 - Number(ts)) > 600) return false; // zaštita od ponavljanja
  const raw = Uint8Array.from(atob(secret.replace(/^whsec_/, '')), (c) => c.charCodeAt(0));
  const key = await crypto.subtle.importKey('raw', raw, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sig = new Uint8Array(await crypto.subtle.sign('HMAC', key, enc.encode(`${id}.${ts}.${body}`)));
  const expected = btoa(String.fromCharCode(...sig));
  return sigHeader.split(' ').some((part) => {
    const [, value] = part.split(',');
    if (!value || value.length !== expected.length) return false;
    let r = 0;
    for (let i = 0; i < value.length; i++) r |= value.charCodeAt(i) ^ expected.charCodeAt(i);
    return r === 0;
  });
}

function tagValue(tags: ResendEvent['data'] extends infer D ? D extends { tags?: infer T } ? T : never : never, name: string) {
  if (!tags) return undefined;
  if (Array.isArray(tags)) return tags.find((t) => t.name === name)?.value;
  return (tags as Record<string, string>)[name];
}

export async function handleResendWebhook(request: Request, env: Env): Promise<Response> {
  if (request.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });
  if (!env.RESEND_WEBHOOK_SECRET) return new Response('Not configured', { status: 503 });
  const id = request.headers.get('svix-id') || '';
  const ts = request.headers.get('svix-timestamp') || '';
  const sig = request.headers.get('svix-signature') || '';
  const body = await request.text();
  if (!id || !ts || !sig || !(await verify(env.RESEND_WEBHOOK_SECRET, id, ts, body, sig))) {
    return new Response('Invalid signature', { status: 401 });
  }

  // Isti događaj može stići više puta — obradi ga samo jednom.
  const seen = await env.DB.prepare('SELECT 1 FROM email_events WHERE svix_id = ?').bind(id).first();
  if (seen) return new Response('ok');

  const ev = JSON.parse(body) as ResendEvent;
  const d = ev.data || {};
  let leadId = Number(tagValue(d.tags as never, 'lead')) || 0;
  if (!leadId && d.email_id) {
    const row = await env.DB.prepare(`SELECT lead_id FROM activities WHERE kind = 'mejl' AND meta LIKE ? LIMIT 1`).bind(`%"id":"${d.email_id}"%`).first<{ lead_id: number }>();
    leadId = row?.lead_id || 0;
  }
  if (!leadId) {
    const to = (Array.isArray(d.to) ? d.to[0] : d.to || '').toLowerCase();
    if (to) {
      const row = await env.DB.prepare('SELECT id FROM leads WHERE lower(email) = ?').bind(to).first<{ id: number }>();
      leadId = row?.id || 0;
    }
  }

  const stmts: D1PreparedStatement[] = [
    env.DB.prepare('INSERT INTO email_events (svix_id, type, email_id, lead_id) VALUES (?, ?, ?, ?)').bind(id, ev.type, d.email_id || null, leadId || null),
  ];

  if (leadId) {
    const subject = d.subject ? `„${d.subject}“` : 'mejl';
    switch (ev.type) {
      case 'email.opened': {
        // u istoriju samo prvo otvaranje istog mejla
        const first = !(await env.DB.prepare(`SELECT 1 FROM email_events WHERE type = 'email.opened' AND email_id = ?`).bind(d.email_id || '').first());
        stmts.push(env.DB.prepare(`UPDATE leads SET opens = opens + 1, last_opened_at = datetime('now'), updated_at = datetime('now') WHERE id = ?`).bind(leadId));
        if (first) stmts.push(env.DB.prepare(`INSERT INTO activities (lead_id, kind, subject, meta) VALUES (?, 'otvoren', ?, ?)`).bind(leadId, `Otvorili ${subject}`, JSON.stringify({ email_id: d.email_id })));
        break;
      }
      case 'email.clicked':
        stmts.push(env.DB.prepare(`UPDATE leads SET clicks = clicks + 1, last_clicked_at = datetime('now'), next_action_at = date('now'), updated_at = datetime('now') WHERE id = ?`).bind(leadId));
        stmts.push(env.DB.prepare(`INSERT INTO activities (lead_id, kind, subject, body, meta) VALUES (?, 'klik', ?, ?, ?)`).bind(leadId, `Kliknuli na link u ${subject}`, d.click?.link || null, JSON.stringify({ email_id: d.email_id })));
        break;
      case 'email.bounced':
        stmts.push(env.DB.prepare(`INSERT INTO activities (lead_id, kind, subject, body) SELECT id, 'napomena', 'Adresa odbila mejl', 'Vraćeno sa: ' || COALESCE(email, '') || '. Naći drugi kontakt.' FROM leads WHERE id = ?`).bind(leadId));
        stmts.push(env.DB.prepare(`UPDATE leads SET notes = COALESCE(notes || char(10), '') || 'Odbijena adresa: ' || COALESCE(email, ''), email = NULL,
          status = CASE WHEN status = 'kontaktiran' THEN 'za_kontakt' ELSE status END, next_action_at = date('now', '+1 day'), updated_at = datetime('now') WHERE id = ?`).bind(leadId));
        break;
      case 'email.complained':
        stmts.push(env.DB.prepare(`INSERT INTO activities (lead_id, kind, subject) VALUES (?, 'napomena', 'Označili mejl kao spam — ne slati više')`).bind(leadId));
        stmts.push(env.DB.prepare(`UPDATE leads SET status = 'izgubljeno', marketing_consent = 0, updated_at = datetime('now') WHERE id = ?`).bind(leadId));
        break;
    }
  }
  await env.DB.batch(stmts);
  return new Response('ok');
}
