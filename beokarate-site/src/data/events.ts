// Demonstracioni podaci o takmičenjima i događajima.

export type EventStatus = 'najavljeno' | 'prijave-otvorene' | 'zavrseno' | 'rezultati'
export type EventKind = 'BKS' | 'KSS' | 'međunarodno' | 'školsko' | 'seminar' | 'kamp'

export interface KarateEvent {
  id: string
  title: string
  date: string // ISO datum početka
  endDate?: string
  location: string
  city: string
  kind: EventKind
  ages: string
  organizer: string
  status: EventStatus
  description: string
  links?: { label: string; href: string }[]
}

export const EVENT_KIND_LABELS: Record<EventKind, string> = {
  BKS: 'BKS',
  KSS: 'Karate savez Srbije',
  međunarodno: 'Međunarodno',
  školsko: 'Školsko',
  seminar: 'Seminar',
  kamp: 'Kamp',
}

export const EVENT_STATUS_LABELS: Record<EventStatus, string> = {
  najavljeno: 'Najavljeno',
  'prijave-otvorene': 'Prijave otvorene',
  zavrseno: 'Završeno',
  rezultati: 'Rezultati objavljeni',
}

export const events: KarateEvent[] = [
  {
    id: 'kup-srbije-2026',
    title: 'Kup Srbije za seniore i juniore',
    date: '2026-07-04',
    location: 'SC Šumice',
    city: 'Beograd',
    kind: 'KSS',
    ages: 'Juniori, seniori',
    organizer: 'Karate savez Srbije',
    status: 'prijave-otvorene',
    description:
      'Tradicionalni Kup Srbije okuplja najbolje takmičare u disciplinama kate i borbe. Prijave klubova preko sistema BKS-a.',
    links: [
      { label: 'Propozicije', href: '#' },
      { label: 'Prijava', href: '#' },
    ],
  },
  {
    id: 'balkan-deca-2026',
    title: 'Balkansko prvenstvo za decu',
    date: '2026-07-18',
    endDate: '2026-07-20',
    location: 'Hala sportova',
    city: 'Podgorica',
    kind: 'međunarodno',
    ages: 'U10, U12, U14',
    organizer: 'Balkanska karate federacija',
    status: 'najavljeno',
    description:
      'Regionalno takmičenje za najmlađe uzraste. Selekciju BKS-a vodi stručni štab saveza.',
    links: [{ label: 'Detalji', href: '#' }],
  },
  {
    id: 'trofej-beograda-2026',
    title: 'Trofej Beograda',
    date: '2026-09-12',
    location: 'SC Voždovac',
    city: 'Beograd',
    kind: 'BKS',
    ages: 'Sve kategorije',
    organizer: 'Beogradski karate savez',
    status: 'najavljeno',
    description:
      'Najveće gradsko takmičenje u organizaciji BKS-a, sa posebnim programom za početnike.',
  },
  {
    id: 'seminar-sudije-2026',
    title: 'Seminar za sudije BKS-a',
    date: '2026-06-28',
    location: 'Dom sportova',
    city: 'Beograd',
    kind: 'seminar',
    ages: 'Sudije, treneri',
    organizer: 'Sudijska komisija BKS',
    status: 'prijave-otvorene',
    description:
      'Obnova licenci i upoznavanje sa izmenama pravila. Obavezno za aktivne sudije BKS-a.',
    links: [{ label: 'Prijava za seminar', href: '#' }],
  },
  {
    id: 'letnji-kamp-2026',
    title: 'Letnji karate kamp',
    date: '2026-08-10',
    endDate: '2026-08-16',
    location: 'Divčibare',
    city: 'Divčibare',
    kind: 'kamp',
    ages: '8–16 godina',
    organizer: 'Beogradski karate savez',
    status: 'prijave-otvorene',
    description:
      'Nedelja treninga, igre i druženja u prirodi, pod nadzorom licenciranih trenera BKS-a.',
    links: [{ label: 'Prijava za kamp', href: '#' }],
  },
  {
    id: 'pljevlja-open-2026',
    title: 'Pljevlja Open',
    date: '2026-05-24',
    location: 'Sportska dvorana',
    city: 'Pljevlja',
    kind: 'međunarodno',
    ages: 'Sve kategorije',
    organizer: 'KK Pljevlja',
    status: 'rezultati',
    description:
      'Klubovi BKS-a osvojili su 19 zlatnih, 21 srebrnu i 19 bronzanih medalja.',
    links: [{ label: 'Rezultati', href: '#' }],
  },
]
