# Lumi Kids Studio — sajt

Sajt za dečje programe po porudžbini (firme, vrtići, institucije, rođendaonice, rođendani).
Statički sajt na **Astro**, hostovan na **Cloudflare Pages**; forma za upit radi preko
**Pages Functions** i čuva upite u **Cloudflare D1** bazi. Bez Vercel-a i Supabase-a.

## Gde se šta menja

| Šta | Fajl |
| --- | --- |
| Kontakt (telefon, imejl, grad, Instagram) | `src/data/site.ts` |
| Radionice (nova radionica = novi objekat, stranica se pravi sama) | `src/data/workshops.ts` |
| Tekstovi početne: za koga, usluge, koraci, primer programa, standardi, FAQ | `src/data/content.ts` |
| Galerija (slike u `public/galerija/`) | `src/data/gallery.ts` |
| Boje i tipografija | `src/styles/global.css` |
| Polja forme | `src/components/InquiryForm.astro` + `functions/api/inquiry.ts` + nova migracija |

## Lokalno

```bash
npm install
npm run dev                 # samo sajt, http://localhost:4321
npm run db:migrate:local    # jednom: lokalna D1 baza
npm run preview             # sajt + forma (wrangler pages dev), http://localhost:8788
```

## Postavljanje na Cloudflare (jednom)

1. `npx wrangler login`
2. `npx wrangler d1 create lumi-kids` → dobijeni `database_id` upiši u `wrangler.toml`.
3. `npm run db:migrate` (pravi tabelu `inquiries` u produkciji).
4. Cloudflare dashboard → Workers & Pages → Create → Pages → poveži ovaj GitHub repo.
   Build command: `npm run build`, output: `dist`. Binding `DB` se čita iz `wrangler.toml`.
   (Ili ručno: `npm run deploy`.)
5. Custom domain: Pages projekat → Custom domains → `lumikids.rs`.

### Obaveštenja o upitima imejlom (opciono)

Upiti se uvek čuvaju u D1. Da stižu i na imejl:
- u `wrangler.toml` upiši `NOTIFY_EMAIL` (može više adresa odvojenih zarezom),
- `npx wrangler pages secret put RESEND_API_KEY` (nalog na resend.com, verifikovan domen za `FROM_EMAIL`).

### Zaštita od spama (opciono)

Forma već ima skriveno „honeypot“ polje. Za jaču zaštitu dodaj Cloudflare Turnstile
widget u formu i secret `TURNSTILE_SECRET` — funkcija ga proverava automatski.

### Pregled upita

```bash
npx wrangler d1 execute lumi-kids --remote --command "select * from inquiries order by id desc limit 20"
```
