// Sadržaj roditeljskog vodiča ("Za roditelje"). Ovo je komunikaciono
// srce sajta i najjači SEO/PR alat saveza.

export interface ParentArticle {
  slug: string
  title: string
  summary: string
  readingMinutes: number
  body: string[]
}

export const parentArticles: ParentArticle[] = [
  {
    slug: 'zasto-karate-za-dete',
    title: 'Zašto karate za dete? 10 razloga zašto je dobar izbor',
    summary:
      'Karate je mnogo više od sporta — to je škola discipline, poštovanja i samopouzdanja.',
    readingMinutes: 4,
    body: [
      'Karate je jedan od retkih sportova koji ravnomerno razvija telo i karakter deteta. Kroz redovan trening dete uči da kontroliše pokrete, ali i emocije.',
      'Evo deset razloga zbog kojih roditelji biraju karate: disciplina, samopouzdanje, koncentracija, poštovanje prema drugima, fizička spremnost, koordinacija, istrajnost, kontrola besa, osećaj pripadnosti i jasna struktura napredovanja kroz pojaseve.',
      'U klubovima članovima BKS-a rad sa decom vode licencirani treneri, uz jasne standarde bezbednosti i metodike prilagođene uzrastu.',
    ],
  },
  {
    slug: 'da-li-je-karate-bezbedan',
    title: 'Da li je karate bezbedan za decu?',
    summary:
      'Uz licencirane trenere i opremu prilagođenu uzrastu, karate je jedan od bezbednijih sportova.',
    readingMinutes: 3,
    body: [
      'Roditelji najčešće brinu o povredama. U praksi, karate za decu naglašava kontrolu, a ne kontakt — posebno u najmlađim uzrastima.',
      'Treninzi za decu fokusirani su na igru, koordinaciju i osnovne tehnike. Borbe sa kontaktom uvode se postepeno, uz obaveznu zaštitnu opremu i nadzor sudija.',
      'BKS od svojih klubova zahteva poštovanje standarda bezbednosti i zaštite dece. Više pročitajte u sekciji „Bezbedan karate”.',
    ],
  },
  {
    slug: 'prvi-trening',
    title: 'Kako izgleda prvi trening?',
    summary: 'Šta da očekujete kada prvi put dovedete dete na trening karatea.',
    readingMinutes: 3,
    body: [
      'Na prvom treningu dete najčešće samo posmatra i postepeno se uključuje. Nije potrebna oprema — dovoljna je udobna sportska odeća.',
      'Trener će se upoznati sa detetom, objasniti osnovna pravila ponašanja u sali (dojo) i provesti grupu kroz zagrevanje i jednostavne vežbe.',
      'Savet roditeljima: ne pritiskajte dete. Prvih nekoliko nedelja služi da se dete navikne na grupu, trenera i ritam treninga.',
    ],
  },
  {
    slug: 'prvo-takmicenje',
    title: 'Prvo takmičenje: vodič za roditelje',
    summary: 'Kako pripremiti dete (i sebe) za prvi izlazak na tatami.',
    readingMinutes: 4,
    body: [
      'Prvo takmičenje je velika emocija — i za dete i za roditelja. Najvažnije je da dete oseti podršku, a ne pritisak za rezultatom.',
      'Pre takmičenja proverite kategoriju, vreme vaganja (ako postoji), potrebnu opremu i raspored. Klub i kalendar BKS-a sadrže sve potrebne informacije.',
      'Tokom takmičenja: bodrite pozitivno, poštujte odluke sudija i protivnike. Posle meča, pohvalite trud bez obzira na ishod.',
    ],
  },
  {
    slug: 'sta-znace-pojasevi',
    title: 'Šta znače pojasevi u karateu?',
    summary: 'Sistem pojaseva pokazuje napredak deteta — od belog do crnog.',
    readingMinutes: 3,
    body: [
      'Boje pojaseva označavaju nivo znanja i iskustva. Početnici nose beli pojas, a kroz polaganja napreduju ka višim zvanjima.',
      'Tipičan redosled je: beli, žuti, narandžasti, zeleni, plavi, ljubičasti, smeđi i na kraju crni pojas. Tačan sistem može se razlikovati po stilu i organizaciji.',
      'Polaganja su prilika da dete pokaže napredak i postavi sebi novi cilj — to gradi istrajnost i samopouzdanje.',
    ],
  },
  {
    slug: 'karate-za-devojcice',
    title: 'Karate za devojčice',
    summary: 'Karate jednako razvija snagu, sigurnost i samopouzdanje kod devojčica.',
    readingMinutes: 3,
    body: [
      'Karate nije „sport za dečake”. Devojčice kroz trening razvijaju snagu, koordinaciju i — možda najvažnije — osećaj sigurnosti i samopouzdanja.',
      'Mnogi klubovi članovi BKS-a imaju izjednačen broj devojčica i dečaka u najmlađim grupama, kao i uspešne takmičarke.',
      'Veštine samoodbrane i sposobnost da se ostane smiren u stresnoj situaciji koriste devojčicama tokom celog života.',
    ],
  },
]
