// POST /api/inquiry
// Čuva upit u D1, pravi/ažurira lead u CMS-u, šalje obaveštenje timu i potvrdu klijentu.
import { type Env, esc, clean, sendEmail, siteUrl } from './lib';
import { confirmationTemplate, renderTemplate } from './emails';

const MAX = 2000;
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

export async function handleInquiry(request: Request, env: Env): Promise<Response> {
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

  const segmentMap: Record<string, string> = {
    'Firma': 'firma', 'Vrtić / škola': 'vrtic', 'Institucija / udruženje': 'institucija',
    'Rođendaonica / igraonica': 'rodjendaonica', 'Roditelj (rođendan)': 'roditelj',
  };

  const cols = Object.keys(data);
  const ins = await env.DB.prepare(
    `INSERT INTO inquiries (${cols.join(', ')}) VALUES (${cols.map(() => '?').join(', ')})`,
  )
    .bind(...Object.values(data))
    .run();
  const inquiryId = ins.meta.last_row_id;

  // Lead u CMS-u: postojeći (po imejlu) se vraća u status „novo“, inače se pravi novi.
  const summary = [
    data.occasion && `Povod: ${data.occasion}`,
    data.event_date && `Datum: ${data.event_date}`,
    data.kids_count && `Broj dece: ${data.kids_count}`,
    data.age_groups && `Uzrast: ${data.age_groups}`,
    data.location && `Lokacija: ${data.location}`,
    data.services && `Usluge: ${data.services}`,
    data.workshops && `Radionice: ${data.workshops}`,
    data.budget && `Budžet: ${data.budget}`,
    data.message && `Poruka: ${data.message}`,
  ].filter(Boolean).join('\n');

  const existing = await env.DB.prepare('SELECT id FROM leads WHERE lower(email) = lower(?)').bind(data.email).first<{ id: number }>();
  let leadId: number;
  if (existing) {
    leadId = existing.id;
    await env.DB.prepare(`UPDATE leads SET status = 'novo', inquiry_id = ?, updated_at = datetime('now'),
      phone = COALESCE(NULLIF(phone, ''), ?), contact_name = COALESCE(NULLIF(contact_name, ''), ?) WHERE id = ?`)
      .bind(inquiryId, data.phone, data.name, leadId).run();
  } else {
    const r = await env.DB.prepare(`INSERT INTO leads (company, segment, city, contact_name, email, phone, source, status, inquiry_id)
      VALUES (?, ?, ?, ?, ?, ?, 'sajt', 'novo', ?)`)
      .bind(data.organization || data.name, segmentMap[data.client_type] || 'firma', data.city, data.name, data.email, data.phone, inquiryId)
      .run();
    leadId = r.meta.last_row_id;
  }
  await env.DB.prepare(`INSERT INTO activities (lead_id, kind, subject, body) VALUES (?, 'upit', ?, ?)`)
    .bind(leadId, `Upit sa sajta: ${data.client_type}`, summary).run();

  const site = siteUrl(env);
  const tasks: Promise<unknown>[] = [];

  if (env.NOTIFY_EMAIL) {
    const labels: Record<string, string> = {
      client_type: 'Ko organizuje', occasion: 'Povod', organization: 'Organizacija', name: 'Ime',
      email: 'Imejl', phone: 'Telefon', city: 'Grad', event_date: 'Datum', kids_count: 'Broj dece',
      age_groups: 'Uzrast', location: 'Lokacija', services: 'Usluge', workshops: 'Radionice',
      budget: 'Budžet', message: 'Poruka', source_page: 'Stranica',
    };
    const rows = Object.entries(data)
      .filter(([, v]) => v !== '' && v !== null)
      .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#6b7d8f;vertical-align:top"><b>${labels[k] ?? k}</b></td><td>${esc(String(v)).replace(/\n/g, '<br>')}</td></tr>`)
      .join('');
    tasks.push(sendEmail(env, {
      to: env.NOTIFY_EMAIL.split(',').map((s) => s.trim()),
      replyTo: data.email,
      subject: `Novi upit: ${data.client_type}${data.organization ? ` — ${data.organization}` : ''} (${data.name})`,
      html: `<div style="font-family:Arial,sans-serif"><h2>Novi upit sa sajta</h2><table>${rows}</table>
        <p><a href="${site}/admin/leads/${leadId}">Otvori lead u CMS-u →</a></p></div>`,
      tags: [{ name: 'type', value: 'notify' }],
    }));
  }

  const conf = renderTemplate(confirmationTemplate, { ime: data.name.split(' ')[0] }, site);
  tasks.push(
    sendEmail(env, { to: data.email, subject: conf.subject, html: conf.html, text: conf.text, tags: [{ name: 'type', value: 'confirmation' }] })
      .then(async (r) => {
        if (r.ok) await env.DB.prepare(`INSERT INTO activities (lead_id, kind, subject, meta) VALUES (?, 'mejl', ?, ?)`)
          .bind(leadId, conf.subject, JSON.stringify({ template: 'potvrda-upita', id: r.id })).run();
      }),
  );

  await Promise.allSettled(tasks);
  return respond(request, 200, { ok: true });
}
