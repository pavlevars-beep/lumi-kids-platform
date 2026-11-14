// Dizajnirani mejl šabloni (tabelarni HTML, radi u Gmail/Outlook klijentima).
// Promenljive u tekstu: {ime}, {firma}, {grad}.
import { esc } from './lib';

export type TemplateVars = { ime?: string; firma?: string; grad?: string; licno?: string };

type Block =
  | { p: string }
  | { list: string[] }
  | { h: string }
  | { timeline: [string, string][] }
  | { cta: [string, string] }
  | { boxes: { title: string; text: string }[] }
  | { photos: [string, string][] }
  | { img: [string, string] }
  | { callout: { title: string; text: string } };

type Template = { key: string; label: string; audience: string; subject: string; preheader: string; hero: string; heroAlt: string; blocks: Block[] };

const BRAND = {
  ink: '#0f2a44', ink2: '#3d5368', ink3: '#6b7d8f', brand: '#0277bd', deep: '#0b3a66',
  bg: '#f3f6f9', line: '#e3e8ee', tint: '#e8f6fe', yellow: '#ffd700',
};

export const templates: Template[] = [
  {
    key: 'prvi-kontakt',
    hero: 'prvi-kontakt',
    heroAlt: 'Roditelji i deca zajedno na Lumi Kids radionici',
    label: 'Prvi kontakt — firma (HR)',
    audience: 'firma',
    subject: 'Program za decu zaposlenih — {firma}',
    preheader: 'Radionice, prijem, fotografisanje i pokloni — mi organizujemo sve, vi samo potvrdite termin.',
    blocks: [
      { p: '{pozdrav}' },
      { p: 'Javljamo se iz Lumi Kids Studija. Organizujemo programe za decu zaposlenih po principu <b>ključ u ruke</b> — Kids Day, Dan porodice, novogodišnje i praznične programe, u vašem ili u našem prostoru.' },
      { p: 'HR timovima najviše znači to što dobijaju jednog partnera za ceo događaj:' },
      { list: [
        'koncept i satnicu programa prilagođenu uzrastu i broju dece',
        'stručne voditelje radionica (nauka, muzika, ples, robotika, govor…) i sav materijal',
        'posebne senzorne i muzičke radionice za bebe i decu do 4 godine, uz roditelja',
        'prijem, bedževe, koordinatora i zajedničko finale',
        'profesionalno fotografisanje događaja i online galeriju sa fotografijama',
        'osveženje, poklone i dekoraciju — po vašem budžetu',
      ] },
      { boxes: [
        { title: '120 min', text: 'tipičan program za 30–40 dece' },
        { title: '2 grupe', text: 'po uzrastu, bez čekanja u redu' },
        { title: '48 h', text: 'do predloga programa i ponude' },
      ] },
      { photos: [['radionica', 'Deca sama izvode oglede'], ['osvezenje', 'Osveženje i detalji']] },
      { p: 'Ako u narednim mesecima planirate događaj za zaposlene i njihovu decu, rado ćemo vam poslati predlog programa sa satnicom i ponudom u paketima — bez obaveze.' },
      { cta: ['Pogledajte šta sve uključujemo', '{site}/?utm_source=email&utm_campaign=prvi-kontakt#usluge'] },
      { p: 'Da li biste imali 10 minuta za kratak razgovor sledeće nedelje?' },
    ],
  },
  {
    key: 'novogodisnji',
    hero: 'deda-mraz-beba',
    heroAlt: 'Beba proverava bradu našeg Deda Mraza',
    label: 'Novogodišnji program — firma',
    audience: 'firma',
    subject: 'Novogodišnji program za decu zaposlenih — i Deda Mraz sa pravom bradom',
    preheader: 'Brada je prava (proverile su i bebe). Radionica, Deda Mraz, pokloni i fotografije — sve na jednom mestu.',
    blocks: [
      { p: '{pozdrav}' },
      { p: 'Decembar je za mnoge kompanije vreme kada se zaposlenima i njihovoj deci kaže hvala. Mi preuzimamo kompletnu organizaciju novogodišnjeg programa — vaš tim samo potvrdi datum i broj dece.' },
      { callout: { title: 'Naš Deda Mraz ima pravu bradu', text: 'Bez lepka i bez gumica. Deca ga redovno proveravaju — malo povuku, dobro pogledaju, pa se nasmeju — i do sada niko nije posumnjao. Iskreno, ni mi više nismo sasvim sigurni. Najmlađi mu sednu u krilo bez straha, a stariji ga zapitkuju šta je sve stiglo u pismima. Strpljiv je, topao i ima vremena za svako dete.' } },
      { h: 'Primer programa (≈35 dece, 4–10 god., 120 min)' },
      { timeline: [
        ['0:00', 'Doček, bedževi sa imenom, okupljanje uz muziku'],
        ['0:15', 'Grupa A: radionica „Vilenjačka laboratorija“ · Grupa B: fotografisanje sa Deda Mrazom'],
        ['0:55', 'Pauza uz sok i grickalice, zamena grupa'],
        ['1:05', 'Grupe se menjaju'],
        ['1:45', 'Finale: Deda Mraz deli poklone, grupna fotografija'],
      ] },
      { img: ['deda-mraz-tim', 'Deda Mraz i tim Lumi Kids Studija'] },
      { p: 'Fotograf beleži ceo program, a fotografije su <b>dostupne u online galeriji</b> u roku od 5 radnih dana — link šaljemo vama, a vi ga prosleđujete zaposlenima. Nudimo tri paketa (Start, Standard, Premium): za ~35 dece paketi počinju od 145.000 RSD, a za veći broj dece organizujemo više grupa ili termina.' },
      { cta: ['Pošaljite upit za decembar', '{site}/?utm_source=email&utm_campaign=novogodisnji#upit'] },
      { p: 'Termini za decembar se brzo popunjavaju — ako vam odgovara, javite okvirni datum i broj dece pa šaljemo predlog u roku od 48 sati.' },
    ],
  },
  {
    key: 'vrtic',
    hero: 'vrtic',
    heroAlt: 'Grupa dece na radionici za stolom',
    label: 'Prvi kontakt — vrtić / škola',
    audience: 'vrtic',
    subject: 'Radionice za vaše grupe — Lumi Kids Studio',
    preheader: 'Dolazimo sa kompletnom opremom i stručnim voditeljima.',
    blocks: [
      { p: '{pozdrav}' },
      { p: 'Lumi Kids Studio izvodi kreativno-edukativne radionice za decu od beba do 10 godina — senzorne i muzičke radionice za bebe uz roditelja, nauka i eksperimenti, muzika, ples, robotika, čitanje i govor, priprema za školu.' },
      { list: [
        'dolazimo u vaš prostor sa svim materijalom',
        'radionicu vodi stručna osoba iz oblasti (pedagog, logoped, defektolog, muzičar…)',
        'svako dete nosi kući nešto što je samo napravilo',
        'pogodno za tematske dane, priredbe i serijale radionica',
      ] },
      { cta: ['Pogledajte radionice', '{site}/radionice?utm_source=email&utm_campaign=vrtic'] },
      { p: 'Rado ćemo predložiti program za vaše grupe — dovoljno je da nam javite uzrast i broj dece.' },
    ],
  },
  {
    key: 'podsetnik',
    hero: 'podsetnik',
    heroAlt: 'Tata i deca stvaraju zajedno',
    label: 'Podsetnik (follow-up)',
    audience: 'sve',
    subject: 'Re: program za decu — {firma}',
    preheader: 'Kratko podsećanje na našu prethodnu poruku.',
    blocks: [
      { p: '{pozdrav}' },
      { p: 'Samo kratko podsećanje na našu prethodnu poruku o programu za decu. Ako vam je trenutno zanimljivo, možemo da pošaljemo konkretan predlog sa satnicom i cenom za vaš broj dece — potrebna su nam samo dva podatka: okvirni datum i broj dece.' },
      { p: 'Ako ovo nije prava osoba za ovu temu, bili bismo zahvalni ako nas uputite na kolegu iz HR-a.' },
      { cta: ['Pošaljite upit', '{site}/?utm_source=email&utm_campaign=podsetnik#upit'] },
    ],
  },
  {
    key: 'hvala',
    hero: 'hvala',
    heroAlt: 'Pun studio dece i roditelja',
    label: 'Zahvalnica posle događaja',
    audience: 'sve',
    subject: 'Hvala na saradnji — {firma}',
    preheader: 'Fotografije stižu uskoro, a vaše mišljenje nam mnogo znači.',
    blocks: [
      { p: '{pozdrav}' },
      { p: 'Hvala vam na poverenju — bilo nam je zadovoljstvo da budemo deo vašeg događaja. Fotografije stižu porodicama u roku od 5 radnih dana.' },
      { p: 'Mnogo bi nam značilo kratko mišljenje: šta vam se najviše dopalo i šta bismo sledeći put mogli bolje? Dovoljno je da odgovorite na ovaj mejl.' },
      { p: 'Ako planirate novi događaj (Dan porodice, Dečja nedelja, kraj školske godine), javite se — za ponovljene saradnje pripremamo novi program i posebne uslove.' },
    ],
  },
];

export const confirmationTemplate: Template = {
  key: 'potvrda-upita',
  hero: 'potvrda',
  heroAlt: 'Devojčica izvodi ogled na radionici',
  label: 'Automatska potvrda upita',
  audience: 'sve',
  subject: 'Primili smo vaš upit — Lumi Kids Studio',
  preheader: 'Javljamo se u roku od 48 sati sa predlogom programa.',
  blocks: [
    { p: '{pozdrav}' },
    { p: 'Hvala na upitu! Primili smo ga i javljamo vam se u roku od <b>48 sati</b> sa predlogom programa, satnicom i ponudom.' },
    { p: 'Ako želite nešto da dodate — datum, broj dece, posebne želje — samo odgovorite na ovaj mejl.' },
    { cta: ['Pogledajte naše radionice', '{site}/radionice'] },
  ],
};

export const templateByKey = (key: string) => templates.find((t) => t.key === key) || (key === confirmationTemplate.key ? confirmationTemplate : undefined);

function fill(s: string, v: TemplateVars, site: string) {
  const pozdrav = v.ime ? `Poštovani/a ${v.ime},` : 'Poštovani,';
  return s
    .replaceAll('{pozdrav}', pozdrav)
    .replaceAll('{ime}', v.ime || '')
    .replaceAll('{firma}', v.firma || 'vaš tim')
    .replaceAll('{grad}', v.grad || '')
    .replaceAll('{site}', site);
}

export function renderTemplate(t: Template, vars: TemplateVars, site: string, subjectOverride?: string) {
  const escVars: TemplateVars = { ime: esc(vars.ime || ''), firma: esc(vars.firma || ''), grad: esc(vars.grad || '') };
  const B = BRAND;
  const pStyle = `margin:0 0 16px;font-size:16px;line-height:1.6;color:${B.ink2}`;
  const blocks = [...t.blocks];
  if (vars.licno?.trim()) {
    blocks.splice(1, 0, { p: esc(vars.licno.trim()).replace(/\n/g, '<br>') });
  }
  const body = blocks
    .map((b) => {
      if ('p' in b) return `<p style="${pStyle}">${fill(b.p, escVars, site)}</p>`;
      if ('h' in b) return `<h3 style="margin:8px 0 12px;font-size:17px;color:${B.ink}">${fill(b.h, escVars, site)}</h3>`;
      if ('list' in b)
        return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 18px">${b.list
          .map((li) => `<tr><td valign="top" style="padding:3px 10px 3px 0;color:#5c8f22;font-weight:bold">✓</td><td style="padding:3px 0;font-size:15px;line-height:1.5;color:${B.ink2}">${fill(li, escVars, site)}</td></tr>`)
          .join('')}</table>`;
      if ('timeline' in b)
        return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 18px;background:${B.bg};border-radius:12px">${b.timeline
          .map(([tm, tx]) => `<tr><td valign="top" style="padding:10px 0 10px 16px;width:52px;font-weight:bold;color:${B.brand};font-size:14px">${tm}</td><td style="padding:10px 16px 10px 0;font-size:14px;line-height:1.5;color:${B.ink2}">${fill(tx, escVars, site)}</td></tr>`)
          .join('')}</table>`;
      if ('boxes' in b)
        return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:4px 0 20px"><tr>${b.boxes
          .map((x) => `<td width="${Math.floor(100 / b.boxes.length)}%" style="padding:0 4px"><div style="background:${B.tint};border-radius:12px;padding:14px 10px;text-align:center"><div style="font-size:20px;font-weight:800;color:${B.deep}">${x.title}</div><div style="font-size:13px;color:${B.ink3};margin-top:4px">${x.text}</div></div></td>`)
          .join('')}</tr></table>`;
      if ('photos' in b)
        return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:4px 0 20px"><tr>${b.photos
          .map(([img, cap]) => `<td width="50%" valign="top" style="padding:0 4px"><img src="${site}/img/email/${img}.jpg" width="260" alt="${esc(cap)}" style="display:block;width:100%;height:auto;border:0;border-radius:12px"><div style="font-size:13px;color:${B.ink3};margin-top:6px;text-align:center">${esc(cap)}</div></td>`)
          .join('')}</tr></table>`;
      if ('img' in b)
        return `<div style="margin:4px 0 20px"><img src="${site}/img/email/${b.img[0]}.jpg" width="536" alt="${esc(b.img[1])}" style="display:block;width:100%;height:auto;border:0;border-radius:14px"><div style="font-size:13px;color:${B.ink3};margin-top:6px;text-align:center">${esc(b.img[1])}</div></div>`;
      if ('callout' in b)
        return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:4px 0 20px"><tr><td style="background:#fff4f2;border-left:4px solid #e53935;border-radius:12px;padding:16px 18px"><div style="font-size:17px;font-weight:800;color:#c62828;margin-bottom:6px">🎅 ${esc(b.callout.title)}</div><div style="font-size:15px;line-height:1.6;color:${B.ink2}">${esc(b.callout.text)}</div></td></tr></table>`;
      if ('cta' in b)
        return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:6px 0 22px"><tr><td style="background:${B.brand};border-radius:999px"><a href="${fill(b.cta[1], escVars, site)}" style="display:inline-block;padding:13px 26px;font-size:15px;font-weight:bold;color:#ffffff;text-decoration:none">${b.cta[0]} →</a></td></tr></table>`;
      return '';
    })
    .join('');

  const subject = fill(subjectOverride || t.subject, { ime: vars.ime, firma: vars.firma, grad: vars.grad }, site);
  const html = `<!doctype html><html lang="sr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(subject)}</title></head>
<body style="margin:0;padding:0;background:${B.bg};font-family:Nunito,'Segoe UI',Arial,sans-serif">
<div style="display:none;max-height:0;overflow:hidden;opacity:0">${esc(t.preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${B.bg}"><tr><td align="center" style="padding:28px 12px">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:18px;overflow:hidden;border:1px solid ${B.line}">
<tr><td style="padding:22px 32px 18px"><img src="${site}/img/email/logo.png" width="170" alt="Lumi Kids Studio" style="display:block;border:0;height:auto;max-width:170px"></td></tr>
<tr><td style="height:5px;line-height:5px;font-size:0;background:linear-gradient(90deg,#ff4b4b,#ff9e3d,#ffd700,#8bc34a,#03a9f4,#0277bd);background-color:#03a9f4">&nbsp;</td></tr>
<tr><td style="padding:0"><img src="${site}/img/email/${t.hero}.jpg" width="600" alt="${esc(t.heroAlt)}" style="display:block;width:100%;max-width:600px;height:auto;border:0"></td></tr>
<tr><td style="padding:30px 32px 10px">${body}
<p style="margin:8px 0 0;font-size:15px;line-height:1.6;color:${B.ink2}">Srdačan pozdrav,<br><b style="color:${B.ink}">Tijana Varsaković</b><br>Lumi Kids Studio · <a href="tel:+381693042721" style="color:${B.brand};text-decoration:none">+381 69 304 2721</a></p></td></tr>
<tr><td style="padding:22px 32px;background:${B.deep};color:#c9dbeb;font-size:13px;line-height:1.6">
<b style="color:#ffffff">Lumi Kids Studio</b> · dečji programi po porudžbini · Beograd i Kragujevac<br>
<a href="${site}" style="color:#ffffff">lumikids.rs</a> · <a href="https://www.instagram.com/studiolumikids/" style="color:#ffffff">@studiolumikids</a><br>
<span style="color:#9fb6cc">Ako ne želite da vam se ubuduće javljamo, samo odgovorite sa „odjava“.</span>
</td></tr></table></td></tr></table></body></html>`;

  const text = blocks
    .map((b) => {
      if ('p' in b) return fill(b.p, { ime: vars.ime, firma: vars.firma, grad: vars.grad }, site).replace(/<[^>]+>/g, '');
      if ('h' in b) return b.h;
      if ('list' in b) return b.list.map((l) => `- ${l}`).join('\n');
      if ('timeline' in b) return b.timeline.map(([a, c]) => `${a}  ${c}`).join('\n');
      if ('boxes' in b) return b.boxes.map((x) => `${x.title} — ${x.text}`).join('\n');
      if ('photos' in b)
        return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:4px 0 20px"><tr>${b.photos
          .map(([img, cap]) => `<td width="50%" valign="top" style="padding:0 4px"><img src="${site}/img/email/${img}.jpg" width="260" alt="${esc(cap)}" style="display:block;width:100%;height:auto;border:0;border-radius:12px"><div style="font-size:13px;color:${B.ink3};margin-top:6px;text-align:center">${esc(cap)}</div></td>`)
          .join('')}</tr></table>`;
      if ('cta' in b) return `${b.cta[0]}: ${fill(b.cta[1], {}, site)}`;
      if ('photos' in b || 'img' in b) return '';
      if ('callout' in b) return `${b.callout.title}\n${b.callout.text}`;
      return '';
    })
    .join('\n\n') + '\n\nSrdačan pozdrav,\nTijana Varsaković\nLumi Kids Studio · +381 69 304 2721\nlumikids.rs';

  return { subject, html, text };
}
