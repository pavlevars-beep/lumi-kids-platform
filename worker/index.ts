// Cloudflare Worker: statički sajt (dist/) + API za upite + CMS (/admin).
import type { Env } from './lib';
import { handleInquiry } from './inquiry';
import { handleAdmin } from './admin';

// Kome se prosleđuju mejlovi poslati na info@lumikids.rs (adrese moraju biti potvrđene u Cloudflare Email Routing-u).
const INBOX_FORWARD = ['pavlevars@gmail.com', 'tijanavars@gmail.com'];

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // www.lumikids.rs -> lumikids.rs
    if (url.hostname.startsWith('www.')) {
      url.hostname = url.hostname.slice(4);
      return Response.redirect(url.toString(), 301);
    }

    if (url.pathname === '/api/inquiry') {
      if (request.method !== 'POST') return new Response('Method Not Allowed', { status: 405, headers: { Allow: 'POST' } });
      return handleInquiry(request, env);
    }

    if (url.pathname === '/admin' || url.pathname.startsWith('/admin/')) {
      return handleAdmin(request, env);
    }

    return env.ASSETS.fetch(request);
  },

  // Dolazni mejlovi (Cloudflare Email Routing → worker): prosledi svakoj adresi posebno,
  // da nepotvrđena adresa ne bi sprečila isporuku ostalima.
  async email(message: ForwardableEmailMessage): Promise<void> {
    const results = await Promise.allSettled(INBOX_FORWARD.map((to) => message.forward(to)));
    const ok = results.filter((r) => r.status === 'fulfilled').length;
    results.forEach((r, i) => { if (r.status === 'rejected') console.error('forward failed', INBOX_FORWARD[i], String(r.reason)); });
    if (ok === 0) message.setReject('Prosleđivanje trenutno nije moguće.');
  },
} satisfies ExportedHandler<Env>;
