# Lumi Kids Studio — sajt

Sajt za dečje programe po porudžbini (firme, vrtići, institucije, rođendaonice, rođendani).
Statički sajt na **Astro**, hostovan kao **Cloudflare Worker** sa statičkim assetima; forma za upit
(`worker/inquiry.ts`, `POST /api/inquiry`) čuva upite u **Cloudflare D1** bazi. Bez Vercel-a i Supabase-a.

## Gde se šta menja

| Šta | Fajl |
| --- | --- |
| Kontakt (telefon, imejl, grad, Instagram) | `src/data/site.ts` |
| Radionice (nova radionica = novi objekat, stranica se pravi sama) | `src/data/workshops.ts` |
| Tekstovi početne: za koga, usluge, koraci, primer programa, standardi, FAQ | `src/data/content.ts` |
| Galerija (slike u `public/galerija/`) | `src/data/gallery.ts` |
| Boje i tipografija | `src/styles/global.css` |
| Polja forme | `src/components/InquiryForm.astro` + `worker/inquiry.ts` + nova migracija |

## Lokalno

```bash
npm install
npm run dev                 # samo sajt, http://localhost:4321
npm run db:migrate:local    # jednom: lokalna D1 baza
npm run preview             # sajt + forma (wrangler dev), http://localhost:8787
```

## Cloudflare (produkcija)

- Worker: `lumi-kids-studio` — https://lumi-kids-studio.pavlevars.workers.dev
- D1 baza: `lumi-kids` (`04a8b679-d7ee-4a3e-ba27-c43e0f304df5`), tabela `inquiries`
- Novi deploy: `npx wrangler login` pa `npm run deploy`

### Domen lumikids.rs

1. Cloudflare dashboard → Add a domain → `lumikids.rs` (Free plan).
2. Kod registrara (trenutno Loopia) zameni nameservere onima koje Cloudflare prikaže.
3. Kad zona postane Active: Workers & Pages → `lumi-kids-studio` → Settings → Domains & Routes →
   Add → Custom domain → `lumikids.rs`, pa isto za `www.lumikids.rs` (worker sam preusmerava www na glavni domen).
4. Odkomentariši `[[routes]]` u `wrangler.toml` da bi budući `wrangler deploy` zadržao domene.

### Obaveštenja o upitima imejlom (opciono)

Upiti se uvek čuvaju u D1. Da stižu i na imejl:
- u `wrangler.toml` upiši `NOTIFY_EMAIL` (može više adresa odvojenih zarezom),
- `npx wrangler secret put RESEND_API_KEY` (nalog na resend.com, verifikovan domen za `FROM_EMAIL`).

### Zaštita od spama (opciono)

Forma već ima skriveno „honeypot“ polje. Za jaču zaštitu dodaj Cloudflare Turnstile
widget u formu i secret `TURNSTILE_SECRET` — funkcija ga proverava automatski.

### Pregled upita

```bash
npx wrangler d1 execute lumi-kids --remote --command "select * from inquiries order by id desc limit 20"
```
