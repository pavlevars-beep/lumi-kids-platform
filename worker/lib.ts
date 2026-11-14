// Zajednički tipovi i pomoćne funkcije za Worker.

export interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
  RESEND_API_KEY?: string;
  NOTIFY_EMAIL?: string;
  FROM_EMAIL?: string;
  REPLY_TO?: string;
  SITE_URL?: string;
  TURNSTILE_SECRET?: string;
  ADMIN_PASSWORD?: string;
  SESSION_SECRET?: string;
  RESEND_WEBHOOK_SECRET?: string;
}

export const esc = (s: unknown) =>
  String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

export const clean = (v: unknown, max = 200) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

export const siteUrl = (env: Env) => (env.SITE_URL || 'https://lumikids.rs').replace(/\/$/, '');

export type SendResult = { ok: boolean; id?: string; error?: string };

/** Slanje preko Resend API-ja. Bez ključa vraća ok:false sa objašnjenjem. */
export async function sendEmail(
  env: Env,
  msg: { to: string | string[]; subject: string; html: string; text?: string; replyTo?: string; tags?: { name: string; value: string }[]; headers?: Record<string, string> },
): Promise<SendResult> {
  if (!env.RESEND_API_KEY) return { ok: false, error: 'Slanje mejlova nije podešeno (nedostaje RESEND_API_KEY).' };
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'content-type': 'application/json' },
    body: JSON.stringify({
      from: env.FROM_EMAIL || 'Lumi Kids Studio <info@lumikids.rs>',
      to: Array.isArray(msg.to) ? msg.to : [msg.to],
      subject: msg.subject,
      html: msg.html,
      text: msg.text,
      reply_to: msg.replyTo || env.REPLY_TO || undefined,
      tags: msg.tags,
      headers: msg.headers,
    }),
  });
  const data = (await res.json().catch(() => ({}))) as { id?: string; message?: string };
  return res.ok ? { ok: true, id: data.id } : { ok: false, error: data.message || `Resend greška ${res.status}` };
}
