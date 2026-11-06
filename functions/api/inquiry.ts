// Cloudflare Pages Function: POST /api/inquiry
// Čuva upit u D1 (binding DB) i, ako je podešeno, šalje obaveštenje imejlom preko Resend-a.

interface Env {
  DB?: D1Database;
  RESEND_API_KEY?: string;
  NOTIFY_EMAIL?: string;
  FROM_EMAIL?: string;
  TURNSTILE_SECRET?: string;
}

const MAX = 2000;
const clean = (v: unknown, max = 200) =>
  typeof v === 'string' ? v.trim().slice(0, max) : '';
const list = (fd: FormData, key: string) =>
  fd.getAll(key).map((v) => clean(v, 80)).filter(Boolean).join(', ');

function respond(req: Request, status: number, body: Record<string, unknown>) {
  const wantsJson = (req.headers.get('accept') || '').includes('application/json');
  if (!wantsJson) {
    // Bez JavaScript-a: vrati korisnika na stranu sa porukom.
    const target = status === 200 ? '/hvala' : '/#upit';
    return Response.redirect(new URL(target, req.url).toString(), 303);
  }
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
}

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  let fd: FormData;
  try {
    fd = await request.formData();
  } catch {
    return respond(request, 400, { ok: false, error: 'Neispravan zahtev.' });
  }

  // Honeypot — botovi popunjavaju skriveno polje; tiho im "potvrdimo".
  if (clean(fd.get('website'))) return respond(request, 200, { ok: true });

  if (env.TURNSTILE_SECRET) {
    const token = clean(fd.get('cf-turnstile-response'), 4096);
    const v = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: new URLSearchParams({
        secret: env.TURNSTILE_SECRET,
        response: token,
        remoteip: request.headers.get('CF-Connecting-IP') || '',
      }),
    }).then((r) => r.json<{ success: boolean }>());
    if (!v.success) return respond(request, 400, { ok: false, error: 'Provera nije uspela.' });
  }

  const data = {
    client_type: clean(fd.get('client_type'), 60),
    occasion: clean(fd.get('occasion'), 80),
    organization: clean(fd.get('organization')),
    name: clean(fd.get('name'), 120),
    email: clean(fd.get('email'), 160),
    phone: clean(fd.get('phone'), 40),
    city: clean(fd.get('city'), 80),
    event_date: clean(fd.get('event_date'), 20),
    kids_count: Number.parseInt(clean(fd.get('kids_count'), 6), 10) || null,
    age_groups: list(fd, 'age_groups'),
    location: clean(fd.get('location'), 80),
    services: list(fd, 'services'),
    workshops: list(fd, 'workshops'),
    budget: clean(fd.get('budget'), 60),
    message: clean(fd.get('message'), MAX),
    source_page: clean(fd.get('source_page'), 120),
  };

  if (!data.name || !data.client_type) {
    return respond(request, 400, { ok: false, error: 'Unesite ime i izaberite ko organizuje.' });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return respond(request, 400, { ok: false, error: 'Unesite ispravnu imejl adresu.' });
  }
  if (!fd.get('consent')) {
    return respond(request, 400, { ok: false, error: 'Potrebna je saglasnost za kontakt.' });
  }

  let saved = false;
  if (env.DB) {
    const cols = Object.keys(data);
    await env.DB.prepare(
      `INSERT INTO inquiries (${cols.join(', ')}) VALUES (${cols.map(() => '?').join(', ')})`,
    )
      .bind(...Object.values(data))
      .run();
    saved = true;
  }

  let mailed = false;
  if (env.RESEND_API_KEY && env.NOTIFY_EMAIL) {
    const labels: Record<string, string> = {
      client_type: 'Ko organizuje', occasion: 'Povod', organization: 'Organizacija', name: 'Ime',
      email: 'Imejl', phone: 'Telefon', city: 'Grad', event_date: 'Datum', kids_count: 'Broj dece',
      age_groups: 'Uzrast', location: 'Lokacija', services: 'Usluge', workshops: 'Radionice',
      budget: 'Budžet', message: 'Poruka', source_page: 'Stranica',
    };
    const rows = Object.entries(data)
      .filter(([, v]) => v !== '' && v !== null)
      .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#6b7d8f"><b>${labels[k] ?? k}</b></td><td>${esc(String(v)).replace(/\n/g, '<br>')}</td></tr>`)
      .join('');
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'content-type': 'application/json' },
      body: JSON.stringify({
        from: env.FROM_EMAIL || 'Lumi Kids <onboarding@resend.dev>',
        to: env.NOTIFY_EMAIL.split(',').map((s) => s.trim()),
        reply_to: data.email,
        subject: `Novi upit: ${data.client_type}${data.organization ? ` — ${data.organization}` : ''} (${data.name})`,
        html: `<h2>Novi upit sa sajta</h2><table>${rows}</table>`,
      }),
    });
    mailed = res.ok;
  }

  if (!saved && !mailed) {
    return respond(request, 503, { ok: false, error: 'Slanje trenutno nije dostupno.' });
  }
  return respond(request, 200, { ok: true });
};
