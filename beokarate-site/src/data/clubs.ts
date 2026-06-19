// Demonstracioni podaci o klubovima. U produkciji ih treba učitavati
// iz baze (npr. Supabase) i omogućiti klubovima da sami ažuriraju profil.

export type ClubProgram = 'deca' | 'rekreativci' | 'takmičari' | 'para-karate'

export interface Club {
  id: string
  name: string
  municipality: string
  address: string
  programs: ClubProgram[]
  ageFrom: number
  schedule: string
  contactPerson: string
  phone: string
  email: string
  instagram?: string
  licensedCoaches: boolean
  competitive: boolean
  highlights?: string
}

export const MUNICIPALITIES = [
  'Stari grad',
  'Vračar',
  'Savski venac',
  'Novi Beograd',
  'Zemun',
  'Čukarica',
  'Rakovica',
  'Voždovac',
  'Zvezdara',
  'Palilula',
  'Mladenovac',
  'Surčin',
] as const

export const PROGRAM_LABELS: Record<ClubProgram, string> = {
  deca: 'Deca',
  rekreativci: 'Rekreativci',
  takmičari: 'Takmičari',
  'para-karate': 'Para-karate',
}

export const clubs: Club[] = [
  {
    id: 'kk-zmaj',
    name: 'KK Zmaj',
    municipality: 'Novi Beograd',
    address: 'Bulevar Mihajla Pupina 10, Novi Beograd',
    programs: ['deca', 'rekreativci', 'takmičari'],
    ageFrom: 5,
    schedule: 'Pon / Sre / Pet 18:00–19:30',
    contactPerson: 'Marko Jovanović',
    phone: '+381 60 123 4567',
    email: 'info@kkzmaj.rs',
    instagram: 'kk_zmaj',
    licensedCoaches: true,
    competitive: true,
    highlights: 'Višestruki osvajači medalja na Kupu Srbije.',
  },
  {
    id: 'kk-samuraj',
    name: 'KK Samuraj',
    municipality: 'Zemun',
    address: 'Glavna 25, Zemun',
    programs: ['deca', 'takmičari', 'para-karate'],
    ageFrom: 6,
    schedule: 'Uto / Čet 17:30–19:00, Sub 10:00–11:30',
    contactPerson: 'Ana Petrović',
    phone: '+381 64 222 3344',
    email: 'kontakt@samuraj.rs',
    instagram: 'kk_samuraj_zemun',
    licensedCoaches: true,
    competitive: true,
    highlights: 'Razvijen para-karate program i inkluzivni treninzi.',
  },
  {
    id: 'kk-sokol',
    name: 'KK Sokol',
    municipality: 'Čukarica',
    address: 'Požeška 100, Čukarica',
    programs: ['deca', 'rekreativci'],
    ageFrom: 4,
    schedule: 'Pon / Sre 17:00–18:00 (najmlađi)',
    contactPerson: 'Ivan Đorđević',
    phone: '+381 63 555 1212',
    email: 'sokol@karate.rs',
    licensedCoaches: true,
    competitive: false,
    highlights: 'Specijalizovani program za predškolski uzrast.',
  },
  {
    id: 'kk-feniks',
    name: 'KK Feniks',
    municipality: 'Voždovac',
    address: 'Vojvode Stepe 200, Voždovac',
    programs: ['deca', 'rekreativci', 'takmičari'],
    ageFrom: 6,
    schedule: 'Uto / Čet / Pet 18:30–20:00',
    contactPerson: 'Jelena Nikolić',
    phone: '+381 65 777 8899',
    email: 'feniks@karate.rs',
    instagram: 'kk_feniks_bg',
    licensedCoaches: true,
    competitive: true,
  },
  {
    id: 'kk-bushido',
    name: 'KK Bushido',
    municipality: 'Vračar',
    address: 'Makenzijeva 40, Vračar',
    programs: ['deca', 'takmičari'],
    ageFrom: 7,
    schedule: 'Pon / Sre / Pet 19:00–20:30',
    contactPerson: 'Nikola Stanković',
    phone: '+381 62 333 4455',
    email: 'bushido@karate.rs',
    instagram: 'bushido_vracar',
    licensedCoaches: true,
    competitive: true,
    highlights: 'Jaka kata sekcija i redovni seminari.',
  },
  {
    id: 'kk-lotos',
    name: 'KK Lotos',
    municipality: 'Palilula',
    address: 'Cvijićeva 15, Palilula',
    programs: ['deca', 'rekreativci', 'para-karate'],
    ageFrom: 5,
    schedule: 'Uto / Čet 17:00–18:30',
    contactPerson: 'Milica Ilić',
    phone: '+381 61 444 5566',
    email: 'lotos@karate.rs',
    licensedCoaches: true,
    competitive: false,
    highlights: 'Inkluzivni klub sa naglaskom na rekreaciju i zdravlje.',
  },
  {
    id: 'kk-vitez',
    name: 'KK Vitez',
    municipality: 'Rakovica',
    address: 'Miška Kranjca 12, Rakovica',
    programs: ['deca', 'takmičari'],
    ageFrom: 6,
    schedule: 'Pon / Sre / Pet 18:00–19:30',
    contactPerson: 'Stefan Marković',
    phone: '+381 60 999 0011',
    email: 'vitez@karate.rs',
    instagram: 'kk_vitez',
    licensedCoaches: true,
    competitive: true,
  },
  {
    id: 'kk-galeb',
    name: 'KK Galeb',
    municipality: 'Mladenovac',
    address: 'Kralja Petra 8, Mladenovac',
    programs: ['deca', 'rekreativci'],
    ageFrom: 5,
    schedule: 'Uto / Čet / Sub 17:30–19:00',
    contactPerson: 'Dragana Tomić',
    phone: '+381 64 121 3434',
    email: 'galeb@karate.rs',
    licensedCoaches: true,
    competitive: false,
    highlights: 'Najveći klub u Mladenovcu sa dugom tradicijom.',
  },
]
