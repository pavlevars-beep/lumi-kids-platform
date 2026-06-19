# Beogradski karate savez — sajt (beokarate-site)

Moderan javni, promotivni i razvojni sajt Beogradskog karate saveza (BKS),
zasnovan na strateškoj analizi postojećeg sajta. Cilj je pomeriti sajt iz
„administrativnog mesta" u **razvojni, komunikacioni i promotivni centar
beogradskog karatea**, sa jasnom hijerarhijom publika: roditelji, klubovi,
takmičari, treneri/sudije, mediji i partneri.

## Tech stack

- React 18 + TypeScript
- Vite 5
- Tailwind CSS 3
- React Router 6

## Pokretanje

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # produkcijski build (uključuje proveru tipova)
npm run preview  # pregled build-a
```

## Struktura

```
src/
  components/   Layout, Header, Footer, kartice (klub, događaj), UI helperi
  pages/        Stranice (Home, FindClub, Parents, Competitions, ...)
  data/         Demo podaci (clubs, events, news, parentArticles)
```

## Implementirane sekcije (prema predloženoj mapi sajta)

1. **Naslovna** — hero poruka, tri korisnička puta, „Zašto karate?",
   sledeći događaji, „Pronađi klub" CTA, najnovije vesti, BKS u brojkama, partneri.
2. **Pronađi klub** — direktorijum sa pretragom i filterima (opština, program),
   mesto za interaktivnu mapu i karticama klubova sa „Pošalji upit".
3. **Za roditelje** — roditeljski vodič (tekstovi), FAQ i CTA za upis.
4. **Takmičenja** — kalendar/događaji sa filterom po tipu i statusom.
5. **Rezultati** — medaljna tabela i filteri (placeholder za bazu rezultata).
6. **Klubovi i članstvo** — kako postati član, benefiti, obrasci.
7. **Treneri i sudije** — edukacija i registar licenci.
8. **Bezbedan karate** — zaštita dece, kodeksi, prijava nepravilnosti.
9. **O BKS-u** — misija, vizija, vrednosti, rukovodstvo.
10. **Media i partneri** — media kit, BKS u brojkama, sponzorski paketi.
11. **Kontakt** — forma za upit, kontakti po publici, newsletter.

## Napomena o sadržaju

Svi podaci (klubovi, događaji, rezultati, brojke, registar trenera) su
**demonstrativni** i nalaze se u `src/data/`. U produkciji ih treba zameniti
zvaničnim podacima i, idealno, učitavati iz baze (npr. Supabase) uz admin
panel kako bi klubovi sami ažurirali svoje profile.

## Sledeći koraci (fazni plan)

- **Faza 1:** zvanični tekstovi i slike, prava lista klubova, osnovni media centar.
- **Faza 2:** interaktivna mapa klubova, baza rezultata, newsletter i forme (backend).
- **Faza 3:** login za klubove, online prijave za događaje, digitalna registracija,
  rang liste, video biblioteka, CRM.
