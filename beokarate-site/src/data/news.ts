// Demonstracioni podaci o vestima, organizovani po kategorijama.

export type NewsCategory =
  | 'Rezultati'
  | 'Najave'
  | 'Edukacija'
  | 'Klubovi'
  | 'Kampovi'
  | 'Para-karate'
  | 'Saopštenja'

export interface NewsItem {
  id: string
  title: string
  date: string
  category: NewsCategory
  excerpt: string
}

export const news: NewsItem[] = [
  {
    id: 'pljevlja-open',
    title: 'Sjajan nastup beogradskih klubova na Pljevlja Open turniru',
    date: '2026-05-25',
    category: 'Rezultati',
    excerpt:
      'Takmičari iz klubova članova BKS-a osvojili su ukupno 59 medalja — 19 zlatnih, 21 srebrnu i 19 bronzanih.',
  },
  {
    id: 'kup-srbije-najava',
    title: 'Otvorene prijave za Kup Srbije',
    date: '2026-06-10',
    category: 'Najave',
    excerpt:
      'Klubovi mogu prijaviti takmičare za Kup Srbije do 28. juna preko zvaničnog sistema saveza.',
  },
  {
    id: 'seminar-trenera',
    title: 'Edukativni seminar za trenere o radu sa najmlađima',
    date: '2026-06-05',
    category: 'Edukacija',
    excerpt:
      'Stručna komisija BKS-a organizuje seminar posvećen metodici rada sa decom uzrasta 4–7 godina.',
  },
  {
    id: 'para-karate-program',
    title: 'BKS širi para-karate program u još tri kluba',
    date: '2026-05-30',
    category: 'Para-karate',
    excerpt:
      'Inkluzivni treninzi postaju dostupni u još tri beogradska kluba uz podršku saveza.',
  },
  {
    id: 'letnji-kamp',
    title: 'Letnji karate kamp na Divčibarama — prijave u toku',
    date: '2026-06-12',
    category: 'Kampovi',
    excerpt:
      'Tradicionalni letnji kamp okuplja decu iz celog Beograda na nedelju dana treninga i druženja.',
  },
  {
    id: 'novi-klub-clan',
    title: 'Još jedan klub pristupio Beogradskom karate savezu',
    date: '2026-06-01',
    category: 'Klubovi',
    excerpt:
      'Mreža klubova članova nastavlja da raste, čime se širi ponuda treninga širom grada.',
  },
]
