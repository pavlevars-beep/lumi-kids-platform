# LumiKids Studio Platform

Platforma za kreativni razvoj dece - React + TypeScript + Vite + Supabase.

## Pokretanje

```bash
npm install
npm run dev
```

## Konfiguracija Supabase

Kopirajte `.env.example` u `.env` i unesite vrednosti:

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Pokrenite migraciju: `supabase/migrations/001_initial.sql`
Pokrenite seed podatke: `supabase/seed.sql`

## Struktura

- `/src/features/` - Feature moduli (auth, workshops, articles, quick-play, ai-advisor)
- `/src/components/` - Deljene UI komponente i layouti
- `/src/pages/` - Stranice (Home, About, Contact, AdminLogin, AdminDashboard)
- `/src/i18n/` - Prevodi (srpski, engleski)
- `/src/lib/` - Supabase klijent, utiliti
- `/supabase/` - Migracije i seed podaci

## Admin panel

URL: `/admin/login` - prijavite se Supabase korisnickim podacima.

## Tech stack

- React 18 + TypeScript
- Vite 5
- React Router v6
- Tailwind CSS 3
- Supabase (auth, baza, storage)
- lucide-react ikone
- Primarni jezik: srpski
