// Lumi Kids CMS — leadovi, prodajni tok i slanje mejlova. Sve pod /admin.
import { type Env, esc, clean, sendEmail, siteUrl } from './lib';
import { isAuthed, checkPassword, sessionCookie, clearCookie, sameOrigin } from './auth';
import { templates, templateByKey, renderTemplate } from './emails';

export const STATUSES = [
  { key: 'novo', label: 'Novi upit', color: '#ff4b4b' },
  { key: 'za_kontakt', label: 'Za kontakt', color: '#6b7d8f' },
  { key: 'kontaktiran', label: 'Kontaktiran', color: '#0288d1' },
  { key: 'u_razgovoru', label: 'U razgovoru', color: '#e07a10' },
  { key: 'ponuda', label: 'Ponuda poslata', color: '#b58b00' },
  { key: 'potvrdjeno', label: 'Potvrđeno', color: '#5c8f22' },
  { key: 'izgubljeno', label: 'Izgubljeno', color: '#9aa7b4' },
] as const;
const statusOf = (k: string) => STATUSES.find((s) => s.key === k) || STATUSES[1];

export const SEGMENTS: Record<string, string> = {
  firma: 'Firma', vrtic: 'Vrtić / škola', institucija: 'Institucija', rodjendaonica: 'Rođendaonica', roditelj: 'Roditelj',
};

type Lead = {
  id: number; created_at: string; updated_at: string; company: string; segment: string; city: string | null;
  website: string | null; employees: string | null; contact_name: string | null; contact_role: string | null;
  email: string | null; phone: string | null; source: string; status: string; value_rsd: number | null;
  next_action_at: string | null; notes: string | null; marketing_consent: number; inquiry_id: number | null;
};
type Activity = { id: number; created_at: string; kind: string; subject: string | null; body: string | null; meta: string | null };

const LEAD_FIELDS = ['company', 'segment', 'city', 'website', 'employees', 'contact_name', 'contact_role', 'email', 'phone', 'source', 'status', 'value_rsd', 'next_action_at', 'notes', 'marketing_consent'] as const;

// ---------- HTML ----------

const CSS = `
:root{--ink:#0f2a44;--ink2:#3d5368;--ink3:#6b7d8f;--brand:#0277bd;--deep:#0b3a66;--bg:#f3f6f9;--line:#e3e8ee;--ok:#5c8f22;--bad:#d92d20}
*{box-sizing:border-box}body{margin:0;font-family:Nunito,system-ui,'Segoe UI',sans-serif;background:var(--bg);color:var(--ink);font-size:15px}
a{color:var(--brand)}header{background:var(--deep);color:#fff}header .in{display:flex;gap:18px;align-items:center;max-width:1280px;margin:0 auto;padding:12px 20px;flex-wrap:wrap}
header img{height:34px;background:#fff;border-radius:8px;padding:3px 6px}header nav{display:flex;gap:16px;flex:1;flex-wrap:wrap}header a{color:#fff;text-decoration:none;font-weight:700}
main{max-width:1280px;margin:0 auto;padding:24px 20px 60px}h1{font-size:1.6rem;margin:0 0 16px}h2{font-size:1.15rem;margin:0 0 12px}
.card{background:#fff;border:1px solid var(--line);border-radius:14px;padding:18px}.grid{display:grid;gap:16px}
.g2{grid-template-columns:1.3fr 1fr}@media(max-width:900px){.g2{grid-template-columns:1fr}}
.pipe{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px}.pipe a{flex:1;min-width:120px;background:#fff;border:1px solid var(--line);border-radius:12px;padding:10px 12px;text-decoration:none;color:var(--ink)}
.pipe a b{display:block;font-size:1.4rem}.pipe a.on{outline:2px solid var(--brand)}
table{width:100%;border-collapse:collapse;background:#fff;border-radius:14px;overflow:hidden;border:1px solid var(--line)}
th,td{text-align:left;padding:10px 12px;border-bottom:1px solid var(--line);vertical-align:top}th{font-size:.78rem;text-transform:uppercase;letter-spacing:.05em;color:var(--ink3);background:#fafbfc}
tr:hover td{background:#fafcff}.muted{color:var(--ink3);font-size:.88rem}.late{color:var(--bad);font-weight:800}
.pill{display:inline-block;padding:3px 10px;border-radius:999px;color:#fff;font-size:.8rem;font-weight:800;white-space:nowrap}
.tag{display:inline-block;padding:2px 8px;border-radius:6px;background:var(--bg);font-size:.8rem;color:var(--ink2)}
form.inline{display:flex;gap:8px;flex-wrap:wrap;align-items:end;margin-bottom:14px}
label{display:block;font-weight:700;font-size:.85rem;margin-bottom:10px}label span{display:block;margin-bottom:4px}
input,select,textarea{width:100%;font:inherit;padding:9px 11px;border:1.5px solid var(--line);border-radius:10px;background:#fff;color:var(--ink)}
textarea{min-height:90px;resize:vertical}.row{display:grid;grid-template-columns:1fr 1fr;gap:10px}.row3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px}
form.inline label{margin:0}form.inline input,form.inline select{width:auto;min-width:160px}
.btn{display:inline-block;background:var(--brand);color:#fff;border:0;border-radius:999px;padding:10px 18px;font:inherit;font-weight:800;cursor:pointer;text-decoration:none}
.btn.ghost{background:#fff;color:var(--ink);border:1.5px solid var(--line)}.btn.sm{padding:6px 12px;font-size:.85rem}
.flash{padding:12px 14px;border-radius:10px;margin-bottom:16px;font-weight:700}.flash.ok{background:#f1f8e8;color:#3f7a12}.flash.err{background:#fff0ee;color:#b42318}
.tl{list-style:none;margin:0;padding:0}.tl li{border-left:3px solid var(--line);padding:4px 0 14px 14px;position:relative}
.tl li:before{content:'';position:absolute;left:-7px;top:8px;width:11px;height:11px;border-radius:50%;background:var(--brand)}
.tl li.mejl:before{background:#e07a10}.tl li.upit:before{background:#ff4b4b}.tl li.status:before{background:#5c8f22}
.tl pre{white-space:pre-wrap;font:inherit;margin:6px 0 0;color:var(--ink2)}.actions{display:flex;gap:8px;flex-wrap:wrap;align-items:center}
.check{display:flex;gap:8px;align-items:center}.check input{width:auto}
`;

function page(title: string, body: string, opts: { flash?: string; err?: string; nav?: boolean } = {}) {
  const nav = opts.nav === false ? '' : `<nav><a href="/admin">Leadovi</a><a href="/admin/leads/new">+ Novi lead</a><a href="/admin/import">Uvoz liste</a><a href="/admin/templates">Mejl šabloni</a><a href="/admin/export.csv">Izvoz CSV</a></nav><a href="/admin/logout">Odjava</a>`;
  const flash = opts.flash ? `<div class="flash ok">${esc(opts.flash)}</div>` : opts.err ? `<div class="flash err">${esc(opts.err)}</div>` : '';
  return new Response(
    `<!doctype html><html lang="sr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>${esc(title)} · Lumi CMS</title>
<link rel="icon" href="/favicon.png"><style>${CSS}</style></head><body><header><div class="in"><a href="/admin"><img src="/img/logo.png" alt="Lumi Kids"></a>${nav}</div></header><main>${flash}${body}</main></body></html>`,
    { headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store', 'x-robots-tag': 'noindex' } },
  );
}

const redirect = (to: string, headers: Record<string, string> = {}) => new Response(null, { status: 303, headers: { Location: to, ...headers } });
const pill = (status: string) => { const s = statusOf(status); return `<span class="pill" style="background:${s.color}">${s.label}</span>`; };
const fmtDate = (d?: string | null) => (d ? new Date(d.replace(' ', 'T') + (d.length > 10 && !d.endsWith('Z') ? 'Z' : '')).toLocaleString('sr-Latn-RS', { day: '2-digit', month: '2-digit', year: 'numeric', ...(d.length > 10 ? { hour: '2-digit', minute: '2-digit' } : {}), timeZone: 'Europe/Belgrade' }) : '');
const today = () => new Date().toISOString().slice(0, 10);
const options = (pairs: [string, string][], sel?: string | null) => pairs.map(([v, l]) => `<option value="${esc(v)}"${v === sel ? ' selected' : ''}>${esc(l)}</option>`).join('');

// ---------- rute ----------

export async function handleAdmin(req: Request, env: Env): Promise<Response> {
  const url = new URL(req.url);
  const path = url.pathname.replace(/\/+$/, '') || '/admin';

  if (path === '/admin/login') return login(req, env);
  if (path === '/admin/logout') return redirect('/admin/login', { 'Set-Cookie': clearCookie });
  if (!(await isAuthed(req, env))) return redirect('/admin/login');
  if (req.method === 'POST' && !sameOrigin(req)) return new Response('Forbidden', { status: 403 });

  const flash = url.searchParams.get('ok') || undefined;
  const err = url.searchParams.get('err') || undefined;

  if (path === '/admin') return list(url, env, flash, err);
  if (path === '/admin/leads/new') return req.method === 'POST' ? createLead(req, env) : leadForm(null, env);
  if (path === '/admin/import') return req.method === 'POST' ? importCsv(req, env) : importForm(flash, err);
  if (path === '/admin/export.csv') return exportCsv(env);
  if (path === '/admin/templates') return templatesPage(env);

  const prev = path.match(/^\/admin\/templates\/([\w-]+)$/);
  if (prev) return previewTemplate(prev[1], url, env);

  const m = path.match(/^\/admin\/leads\/(\d+)(?:\/(\w+))?$/);
  if (m) {
    const id = Number(m[1]);
    const action = m[2];
    if (!action) return req.method === 'POST' ? updateLead(id, req, env) : leadDetail(id, env, flash, err);
    if (req.method !== 'POST') return redirect(`/admin/leads/${id}`);
    if (action === 'note') return addNote(id, req, env);
    if (action === 'email') return sendLeadEmail(id, req, env);
    if (action === 'delete') return deleteLead(id, env);
  }
  return page('Nije pronađeno', '<h1>Stranica ne postoji</h1>');
}

async function login(req: Request, env: Env) {
  let err = '';
  if (!env.ADMIN_PASSWORD) err = 'Admin lozinka još nije podešena (secret ADMIN_PASSWORD).';
  if (req.method === 'POST' && env.ADMIN_PASSWORD) {
    const fd = await req.formData();
    if (await checkPassword(env, clean(fd.get('password'), 200))) {
      return redirect('/admin', { 'Set-Cookie': await sessionCookie(env) });
    }
    await new Promise((r) => setTimeout(r, 600));
    err = 'Pogrešna lozinka.';
  }
  return page('Prijava', `<div class="card" style="max-width:380px;margin:60px auto"><h1>Lumi CMS</h1>
    <form method="post"><label><span>Lozinka</span><input type="password" name="password" autofocus required></label><button class="btn">Prijavi se</button></form></div>`, { err, nav: false });
}

async function list(url: URL, env: Env, flash?: string, err?: string) {
  const status = url.searchParams.get('status') || '';
  const segment = url.searchParams.get('segment') || '';
  const q = url.searchParams.get('q') || '';
  const where: string[] = [];
  const binds: unknown[] = [];
  if (status) { where.push('status = ?'); binds.push(status); } else where.push("status NOT IN ('izgubljeno')");
  if (segment) { where.push('segment = ?'); binds.push(segment); }
  if (q) { where.push('(company LIKE ? OR contact_name LIKE ? OR email LIKE ? OR city LIKE ? OR notes LIKE ?)'); binds.push(...Array(5).fill(`%${q}%`)); }
  const sql = `SELECT * FROM leads ${where.length ? 'WHERE ' + where.join(' AND ') : ''}
    ORDER BY CASE status WHEN 'novo' THEN 0 ELSE 1 END, CASE WHEN next_action_at IS NULL OR next_action_at = '' THEN 1 ELSE 0 END, next_action_at, updated_at DESC LIMIT 500`;
  const [{ results: leads }, { results: counts }] = await Promise.all([
    env.DB.prepare(sql).bind(...binds).all<Lead>(),
    env.DB.prepare('SELECT status, COUNT(*) AS n, COALESCE(SUM(value_rsd),0) AS v FROM leads GROUP BY status').all<{ status: string; n: number; v: number }>(),
  ]);
  const cnt = Object.fromEntries(counts.map((c) => [c.status, c]));
  const qs = (s: string) => `/admin?status=${s}${segment ? `&segment=${segment}` : ''}`;
  const pipe = STATUSES.map((s) => `<a href="${qs(s.key)}" class="${status === s.key ? 'on' : ''}" style="border-top:4px solid ${s.color}"><b>${cnt[s.key]?.n || 0}</b><span class="muted">${s.label}${cnt[s.key]?.v ? ` · ${Number(cnt[s.key].v).toLocaleString('sr-RS')} RSD` : ''}</span></a>`).join('');
  const t = today();
  const rows = leads.map((l) => `<tr>
    <td><a href="/admin/leads/${l.id}"><b>${esc(l.company)}</b></a><div class="muted">${esc(SEGMENTS[l.segment] || l.segment)}${l.city ? ' · ' + esc(l.city) : ''}${l.source === 'sajt' ? ' · <span class="tag">sa sajta</span>' : ''}</div></td>
    <td>${esc(l.contact_name || '')}${l.contact_role ? `<div class="muted">${esc(l.contact_role)}</div>` : ''}</td>
    <td>${l.email ? `<a href="mailto:${esc(l.email)}">${esc(l.email)}</a>` : '<span class="muted">—</span>'}${l.phone ? `<div class="muted">${esc(l.phone)}</div>` : ''}</td>
    <td>${pill(l.status)}</td>
    <td class="${l.next_action_at && l.next_action_at < t ? 'late' : ''}">${esc(fmtDate(l.next_action_at))}</td>
    <td>${l.value_rsd ? Number(l.value_rsd).toLocaleString('sr-RS') + ' RSD' : ''}</td></tr>`).join('');
  return page('Leadovi', `<h1>Leadovi</h1><div class="pipe"><a href="/admin${segment ? `?segment=${segment}` : ''}" class="${!status ? 'on' : ''}"><b>${leads.length}</b><span class="muted">Aktivni prikaz</span></a>${pipe}</div>
    <form class="inline" method="get"><input type="hidden" name="status" value="${esc(status)}">
    <label><span>Pretraga</span><input name="q" value="${esc(q)}" placeholder="firma, ime, grad…"></label>
    <label><span>Segment</span><select name="segment"><option value="">Svi</option>${options(Object.entries(SEGMENTS), segment)}</select></label>
    <button class="btn ghost">Filtriraj</button><a class="btn" href="/admin/leads/new">+ Novi lead</a></form>
    <table><thead><tr><th>Organizacija</th><th>Kontakt osoba</th><th>Kontakt</th><th>Status</th><th>Sledeći korak</th><th>Vrednost</th></tr></thead>
    <tbody>${rows || '<tr><td colspan="6" class="muted">Nema leadova za ovaj filter.</td></tr>'}</tbody></table>`, { flash, err });
}

function leadFields(l: Partial<Lead> | null) {
  const v = (k: keyof Lead) => esc(l?.[k] ?? '');
  return `<label><span>Naziv firme / ustanove *</span><input name="company" required value="${v('company')}"></label>
  <div class="row3"><label><span>Segment</span><select name="segment">${options(Object.entries(SEGMENTS), l?.segment || 'firma')}</select></label>
  <label><span>Grad</span><input name="city" value="${v('city')}"></label>
  <label><span>Broj zaposlenih</span><input name="employees" value="${v('employees')}" placeholder="npr. 200+"></label></div>
  <div class="row"><label><span>Kontakt osoba</span><input name="contact_name" value="${v('contact_name')}"></label>
  <label><span>Funkcija</span><input name="contact_role" value="${v('contact_role')}" placeholder="npr. HR menadžer"></label></div>
  <div class="row"><label><span>Imejl</span><input type="email" name="email" value="${v('email')}"></label>
  <label><span>Telefon</span><input name="phone" value="${v('phone')}"></label></div>
  <div class="row"><label><span>Sajt</span><input name="website" value="${v('website')}"></label>
  <label><span>Izvor</span><select name="source">${options([['rucno', 'Ručno / istraživanje'], ['sajt', 'Upit sa sajta'], ['preporuka', 'Preporuka'], ['linkedin', 'LinkedIn'], ['instagram', 'Instagram'], ['dogadjaj', 'Događaj / sajam'], ['postojeci', 'Postojeći klijent']], l?.source || 'rucno')}</select></label></div>
  <div class="row3"><label><span>Status</span><select name="status">${options(STATUSES.map((s) => [s.key, s.label]), l?.status || 'za_kontakt')}</select></label>
  <label><span>Sledeći korak (datum)</span><input type="date" name="next_action_at" value="${v('next_action_at')}"></label>
  <label><span>Vrednost ponude (RSD)</span><input type="number" name="value_rsd" value="${v('value_rsd')}"></label></div>
  <label><span>Beleške</span><textarea name="notes">${v('notes')}</textarea></label>
  <label class="check"><input type="checkbox" name="marketing_consent" value="1"${l?.marketing_consent ? ' checked' : ''}> Dao/la saglasnost za novosti i kampanje</label>`;
}

function readLead(fd: FormData) {
  const out: Record<string, unknown> = {};
  for (const f of LEAD_FIELDS) {
    const raw = clean(fd.get(f), f === 'notes' ? 5000 : 200);
    if (f === 'value_rsd') out[f] = raw ? Number(raw.replace(/\D/g, '')) || null : null;
    else if (f === 'marketing_consent') out[f] = fd.get(f) ? 1 : 0;
    else out[f] = raw || null;
  }
  if (out.email) out.email = String(out.email).toLowerCase();
  if (!out.segment) out.segment = 'firma';
  if (!out.status) out.status = 'za_kontakt';
  if (!out.source) out.source = 'rucno';
  return out;
}

function leadForm(l: Lead | null, _env: Env, err?: string) {
  return page('Novi lead', `<h1>Novi lead</h1><div class="card" style="max-width:820px"><form method="post" action="/admin/leads/new">${leadFields(l)}<button class="btn">Sačuvaj</button></form></div>`, { err });
}

async function createLead(req: Request, env: Env) {
  const data = readLead(await req.formData());
  if (!data.company) return leadForm(null, env, 'Naziv je obavezan.');
  try {
    const cols = Object.keys(data);
    const r = await env.DB.prepare(`INSERT INTO leads (${cols.join(',')}) VALUES (${cols.map(() => '?').join(',')})`).bind(...Object.values(data)).run();
    return redirect(`/admin/leads/${r.meta.last_row_id}?ok=Lead+je+sačuvan`);
  } catch (e) {
    return leadForm(data as unknown as Lead, env, String(e).includes('UNIQUE') ? 'Lead sa ovim imejlom već postoji.' : 'Greška pri čuvanju.');
  }
}

async function leadDetail(id: number, env: Env, flash?: string, err?: string) {
  const lead = await env.DB.prepare('SELECT * FROM leads WHERE id = ?').bind(id).first<Lead>();
  if (!lead) return page('Nije pronađeno', '<h1>Lead ne postoji</h1>');
  const { results: acts } = await env.DB.prepare('SELECT * FROM activities WHERE lead_id = ? ORDER BY created_at DESC, id DESC').bind(id).all<Activity>();
  const tl = acts.map((a) => `<li class="${esc(a.kind)}"><b>${esc(a.subject || a.kind)}</b> <span class="muted">· ${esc(fmtDate(a.created_at))}</span>${a.body ? `<pre>${esc(a.body)}</pre>` : ''}</li>`).join('');
  const defaultTpl = lead.segment === 'vrtic' ? 'vrtic' : 'prvi-kontakt';
  const tplOpts = options(templates.map((t) => [t.key, t.label]), defaultTpl);
  const first = (lead.contact_name || '').split(' ')[0];
  const canSend = !!lead.email;
  return page(lead.company, `<div class="actions" style="justify-content:space-between;margin-bottom:12px"><h1 style="margin:0">${esc(lead.company)} ${pill(lead.status)}</h1><a href="/admin" class="btn ghost sm">← Svi leadovi</a></div>
  <div class="grid g2">
    <div class="card"><h2>Podaci</h2><form method="post" action="/admin/leads/${id}">${leadFields(lead)}<div class="actions"><button class="btn">Sačuvaj izmene</button><span class="muted">Dodat ${esc(fmtDate(lead.created_at))}</span></div></form>
      <form method="post" action="/admin/leads/${id}/delete" onsubmit="return confirm('Obrisati lead i celu istoriju?')" style="margin-top:14px"><button class="btn ghost sm">Obriši lead</button></form></div>
    <div class="grid" style="align-content:start">
      <div class="card"><h2>Pošalji mejl</h2>${canSend ? `
        <form method="post" action="/admin/leads/${id}/email">
          <label><span>Šablon</span><select name="template" id="tpl">${tplOpts}</select></label>
          <label><span>Ime u pozdravu</span><input name="ime" value="${esc(first)}" placeholder="prazno = „Poštovani,“"></label>
          <label><span>Lična rečenica na početku (opciono)</span><textarea name="licno" placeholder="npr. Videli smo da ste nedavno organizovali Dan porodice…"></textarea></label>
          <label><span>Naslov (opciono — prazno = iz šablona)</span><input name="subject"></label>
          <div class="actions"><button class="btn" onclick="return confirm('Poslati mejl na ${esc(lead.email)}?')">Pošalji na ${esc(lead.email)}</button>
          <a class="btn ghost sm" target="_blank" id="pv" href="/admin/templates/${defaultTpl}?lead=${id}">Pregled</a></div>
        </form>
        <script>document.getElementById('tpl').addEventListener('change',e=>{document.getElementById('pv').href='/admin/templates/'+e.target.value+'?lead=${id}'})</script>` : '<p class="muted">Dodaj imejl kontakt osobe da bi mogao da šalješ mejlove.</p>'}
      </div>
      <div class="card"><h2>Beleška / poziv</h2><form method="post" action="/admin/leads/${id}/note">
        <div class="row"><label><span>Tip</span><select name="kind">${options([['napomena', 'Beleška'], ['poziv', 'Poziv'], ['sastanak', 'Sastanak']])}</select></label>
        <label><span>Sledeći korak</span><input type="date" name="next_action_at" value="${esc(lead.next_action_at || '')}"></label></div>
        <label><span>Šta je dogovoreno</span><textarea name="body" required></textarea></label><button class="btn">Dodaj</button></form></div>
      <div class="card"><h2>Istorija</h2><ul class="tl">${tl || '<li>Još nema aktivnosti.</li>'}</ul></div>
    </div></div>`, { flash, err });
}

async function updateLead(id: number, req: Request, env: Env) {
  const before = await env.DB.prepare('SELECT status FROM leads WHERE id = ?').bind(id).first<{ status: string }>();
  if (!before) return redirect('/admin');
  const data = readLead(await req.formData());
  const sets = Object.keys(data).map((k) => `${k} = ?`).join(', ');
  try {
    await env.DB.prepare(`UPDATE leads SET ${sets}, updated_at = datetime('now') WHERE id = ?`).bind(...Object.values(data), id).run();
  } catch (e) {
    return redirect(`/admin/leads/${id}?err=${encodeURIComponent(String(e).includes('UNIQUE') ? 'Drugi lead već ima ovaj imejl.' : 'Greška pri čuvanju.')}`);
  }
  if (before.status !== data.status) {
    await env.DB.prepare(`INSERT INTO activities (lead_id, kind, subject) VALUES (?, 'status', ?)`).bind(id, `Status: ${statusOf(before.status).label} → ${statusOf(String(data.status)).label}`).run();
  }
  return redirect(`/admin/leads/${id}?ok=Sačuvano`);
}

async function addNote(id: number, req: Request, env: Env) {
  const fd = await req.formData();
  const kind = clean(fd.get('kind'), 20) || 'napomena';
  const body = clean(fd.get('body'), 5000);
  const next = clean(fd.get('next_action_at'), 10);
  const labels: Record<string, string> = { napomena: 'Beleška', poziv: 'Poziv', sastanak: 'Sastanak' };
  if (body) await env.DB.prepare('INSERT INTO activities (lead_id, kind, subject, body) VALUES (?, ?, ?, ?)').bind(id, kind, labels[kind] || 'Beleška', body).run();
  await env.DB.prepare(`UPDATE leads SET next_action_at = ?, updated_at = datetime('now'),
    status = CASE WHEN ? IN ('poziv','sastanak') AND status IN ('novo','za_kontakt','kontaktiran') THEN 'u_razgovoru' ELSE status END WHERE id = ?`)
    .bind(next || null, kind, id).run();
  return redirect(`/admin/leads/${id}?ok=Dodato`);
}

async function sendLeadEmail(id: number, req: Request, env: Env) {
  const lead = await env.DB.prepare('SELECT * FROM leads WHERE id = ?').bind(id).first<Lead>();
  if (!lead?.email) return redirect(`/admin/leads/${id}?err=Lead+nema+imejl`);
  const fd = await req.formData();
  const tpl = templateByKey(clean(fd.get('template'), 40));
  if (!tpl) return redirect(`/admin/leads/${id}?err=Nepoznat+šablon`);
  const vars = { ime: clean(fd.get('ime'), 80), firma: lead.company, grad: lead.city || '', licno: clean(fd.get('licno'), 2000) };
  const mail = renderTemplate(tpl, vars, siteUrl(env), clean(fd.get('subject'), 200) || undefined);
  const res = await sendEmail(env, { to: lead.email, subject: mail.subject, html: mail.html, text: mail.text, tags: [{ name: 'template', value: tpl.key }, { name: 'lead', value: String(id) }] });
  if (!res.ok) return redirect(`/admin/leads/${id}?err=${encodeURIComponent(res.error || 'Slanje nije uspelo')}`);
  await env.DB.prepare(`INSERT INTO activities (lead_id, kind, subject, body, meta) VALUES (?, 'mejl', ?, ?, ?)`)
    .bind(id, `Mejl: ${mail.subject}`, vars.licno || null, JSON.stringify({ template: tpl.key, id: res.id })).run();
  const followUp = new Date(Date.now() + 5 * 864e5).toISOString().slice(0, 10);
  await env.DB.prepare(`UPDATE leads SET updated_at = datetime('now'),
      status = CASE WHEN status IN ('novo','za_kontakt') THEN 'kontaktiran' ELSE status END,
      next_action_at = CASE WHEN next_action_at IS NULL OR next_action_at = '' OR next_action_at < date('now') THEN ? ELSE next_action_at END
    WHERE id = ?`).bind(followUp, id).run();
  return redirect(`/admin/leads/${id}?ok=${encodeURIComponent(`Mejl poslat na ${lead.email}. Podsetnik za follow-up: ${followUp}`)}`);
}

async function deleteLead(id: number, env: Env) {
  await env.DB.batch([env.DB.prepare('DELETE FROM activities WHERE lead_id = ?').bind(id), env.DB.prepare('DELETE FROM leads WHERE id = ?').bind(id)]);
  return redirect('/admin?ok=Lead+obrisan');
}

function templatesPage(env: Env) {
  const rows = templates.map((t) => `<tr><td><b>${esc(t.label)}</b><div class="muted">${esc(t.subject)}</div></td><td>${esc(SEGMENTS[t.audience] || 'Svi')}</td><td><a class="btn ghost sm" target="_blank" href="/admin/templates/${t.key}">Pregled</a></td></tr>`).join('');
  return page('Mejl šabloni', `<h1>Mejl šabloni</h1><p class="muted">Šabloni se šalju iz kartice leada. Tekst menjaš u <code>worker/emails.ts</code>. Slanje: ${env.RESEND_API_KEY ? '<b style="color:#5c8f22">Resend povezan</b>' : '<b style="color:#d92d20">Resend nije podešen</b>'}.</p>
    <table><thead><tr><th>Šablon</th><th>Za</th><th></th></tr></thead><tbody>${rows}</tbody></table>`);
}

async function previewTemplate(key: string, url: URL, env: Env) {
  const tpl = templateByKey(key);
  if (!tpl) return page('Nije pronađeno', '<h1>Šablon ne postoji</h1>');
  let vars = { ime: 'Marija', firma: 'Primer d.o.o.', grad: 'Kragujevac' };
  const leadId = Number(url.searchParams.get('lead'));
  if (leadId) {
    const l = await env.DB.prepare('SELECT company, contact_name, city FROM leads WHERE id = ?').bind(leadId).first<Lead>();
    if (l) vars = { ime: (l.contact_name || '').split(' ')[0], firma: l.company, grad: l.city || '' };
  }
  const mail = renderTemplate(tpl, vars, siteUrl(env));
  return new Response(mail.html.replace('<body', `<body data-subject="${esc(mail.subject)}"`).replace('<table role="presentation" width="100%"', `<div style="max-width:600px;margin:16px auto 0;font-family:Arial;font-size:14px;color:#3d5368"><b>Naslov:</b> ${esc(mail.subject)}</div><table role="presentation" width="100%"`), {
    headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' },
  });
}

// ---------- uvoz / izvoz ----------

const CSV_COLS = ['firma', 'segment', 'grad', 'kontakt', 'funkcija', 'email', 'telefon', 'sajt', 'zaposleni', 'napomena'];

function importForm(flash?: string, err?: string) {
  return page('Uvoz liste', `<h1>Uvoz liste firmi</h1><div class="card" style="max-width:900px">
    <p>Nalepi CSV (iz Excel/Google Sheets: <i>File → Download → CSV</i>). Prvi red su nazivi kolona:</p>
    <p><code>${CSV_COLS.join(',')}</code></p>
    <p class="muted">Obavezna je samo kolona <b>firma</b>. Segment: firma, vrtic, institucija, rodjendaonica, roditelj. Firme koje već postoje (isti imejl ili isti naziv) se preskaču.</p>
    <form method="post"><label><span>CSV</span><textarea name="csv" style="min-height:260px;font-family:monospace" placeholder="firma,segment,grad,kontakt,funkcija,email,telefon,sajt,zaposleni,napomena&#10;Primer d.o.o.,firma,Kragujevac,Ana Anić,HR menadžer,ana@primer.rs,,primer.rs,250,"></textarea></label>
    <button class="btn">Uvezi</button></form></div>`, { flash, err });
}

function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [], cell = '', q = false;
  const sep = (text.split('\n')[0].match(/;/g)?.length || 0) > (text.split('\n')[0].match(/,/g)?.length || 0) ? ';' : ',';
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) {
      if (c === '"' && text[i + 1] === '"') { cell += '"'; i++; } else if (c === '"') q = false; else cell += c;
    } else if (c === '"') q = true;
    else if (c === sep) { row.push(cell); cell = ''; }
    else if (c === '\n' || c === '\r') { if (c === '\r' && text[i + 1] === '\n') i++; row.push(cell); rows.push(row); row = []; cell = ''; }
    else cell += c;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  return rows.filter((r) => r.some((x) => x.trim()));
}

async function importCsv(req: Request, env: Env) {
  const fd = await req.formData();
  const rows = parseCsv(clean(fd.get('csv'), 500_000));
  if (rows.length < 2) return importForm(undefined, 'CSV mora imati red sa nazivima kolona i bar jedan red podataka.');
  const head = rows[0].map((h) => h.trim().toLowerCase());
  const idx = (k: string) => head.indexOf(k);
  if (idx('firma') < 0) return importForm(undefined, 'Nedostaje kolona „firma“.');
  const { results: existing } = await env.DB.prepare('SELECT lower(company) AS c, lower(email) AS e FROM leads').all<{ c: string; e: string | null }>();
  const names = new Set(existing.map((x) => x.c));
  const emails = new Set(existing.map((x) => x.e).filter(Boolean));
  const stmts: D1PreparedStatement[] = [];
  let skipped = 0;
  for (const r of rows.slice(1)) {
    const g = (k: string) => (idx(k) >= 0 ? (r[idx(k)] || '').trim() : '');
    const company = g('firma');
    const email = g('email').toLowerCase();
    if (!company || names.has(company.toLowerCase()) || (email && emails.has(email))) { skipped++; continue; }
    names.add(company.toLowerCase()); if (email) emails.add(email);
    const seg = SEGMENTS[g('segment')] ? g('segment') : 'firma';
    stmts.push(env.DB.prepare(`INSERT INTO leads (company, segment, city, contact_name, contact_role, email, phone, website, employees, notes, source, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'rucno', 'za_kontakt')`)
      .bind(company, seg, g('grad') || null, g('kontakt') || null, g('funkcija') || null, email || null, g('telefon') || null, g('sajt') || null, g('zaposleni') || null, g('napomena') || null));
  }
  for (let i = 0; i < stmts.length; i += 50) await env.DB.batch(stmts.slice(i, i + 50));
  return redirect(`/admin?ok=${encodeURIComponent(`Uvezeno ${stmts.length} leadova${skipped ? `, preskočeno ${skipped} (duplikati/prazni)` : ''}.`)}`);
}

async function exportCsv(env: Env) {
  const { results } = await env.DB.prepare('SELECT * FROM leads ORDER BY id').all<Lead>();
  const cols = ['id', ...LEAD_FIELDS, 'created_at', 'updated_at'] as const;
  const q = (v: unknown) => { const s = String(v ?? ''); return /[",\n;]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s; };
  const csv = '﻿' + [cols.join(','), ...results.map((l) => cols.map((c) => q((l as Record<string, unknown>)[c])).join(','))].join('\n');
  return new Response(csv, { headers: { 'content-type': 'text/csv; charset=utf-8', 'content-disposition': `attachment; filename="lumi-leadovi-${today()}.csv"`, 'cache-control': 'no-store' } });
}
