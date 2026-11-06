// Katalog radionica. Dodavanje nove radionice = novi objekat u nizu;
// stranica /radionice/<slug> se pravi automatski.
export type Workshop = {
  slug: string;
  name: string;
  area: string;
  short: string;
  description: string;
  activities: string[];
  outcome: string;
  ages: string;
  duration: string;
  groupSize: string;
  color: 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'navy';
  icon: string;
  image?: string;
};

export const workshops: Workshop[] = [
  {
    slug: 'zvuci-maste',
    name: 'Zvuci mašte',
    area: 'Muzika i senzorika',
    short: 'Muzičko-taktilno istraživanje: ritam, instrumenti i susret sa klasičnom muzikom.',
    description:
      'Deca kroz pokret, zvuk i dodir otkrivaju muziku. Upoznaju instrumente, prave sopstvene zvučne predmete, igraju se ritmom i slušaju odlomke klasične muzike kroz priču koju sami „ilustruju“ telom i zvukom.',
    activities: [
      'Taktilno istraživanje instrumenata i materijala koji proizvode zvuk',
      'Ritmičke igre i zajedničko muziciranje',
      'Klasična muzika kroz priču i pokret',
      'Pravljenje jednostavnog instrumenta',
    ],
    outcome: 'Dete nosi kući instrument koji je samo napravilo.',
    ages: 'od 1 do 7 godina (prilagođeno uzrastu)',
    duration: '45–60 min',
    groupSize: 'do 15 dece',
    color: 'yellow',
    icon: 'music',
  },
  {
    slug: 'mali-naucnici',
    name: 'Mali naučnici',
    area: 'Nauka i eksperimenti',
    short: 'Bezbedni, zanimljivi eksperimenti iz hemije, fizike i biologije.',
    description:
      'Laboratorija u kojoj deca postaju istraživači: postavljaju pitanja, predviđaju šta će se desiti i sama izvode eksperimente. Sav materijal je bezbedan za uzrast, a svako dete radi na svojoj stanici uz zaštitnu opremu.',
    activities: [
      'Vulkan, lava lampa u tegli, sneg koji raste iz praha',
      'Kristali, nevidljivo mastilo, slime',
      'Rad u parovima uz zaštitne naočare i kecelje',
      'Tematske verzije: zimska, prolećna, svemirska laboratorija',
    ],
    outcome: 'Eksperiment koji dete samo napravi i ponese kući.',
    ages: '4–10 godina',
    duration: '40–60 min',
    groupSize: '12–16 dece',
    color: 'green',
    icon: 'flask',
    image: '/galerija/mala-naucnica.webp',
  },
  {
    slug: 'citanjac',
    name: 'Čitanjac',
    area: 'Čitanje i govor',
    short: 'Ljubav prema knjizi, bogaćenje rečnika i slobodno izražavanje.',
    description:
      'Radionica u kojoj priča postaje igra. Čitamo zajedno, dramatizujemo, izmišljamo nastavke i kroz razgovor razvijamo rečnik, razumevanje i samopouzdanje u govoru pred drugima.',
    activities: [
      'Interaktivno čitanje i pričanje priča',
      'Igre reči, rime i zagonetke',
      'Dramatizacija i lutkarske scene',
      'Izrada sopstvene mini-knjige',
    ],
    outcome: 'Mini-knjiga ili ilustrovana priča koju je dete osmislilo.',
    ages: '3–9 godina',
    duration: '45–60 min',
    groupSize: 'do 14 dece',
    color: 'orange',
    icon: 'book',
  },
  {
    slug: 'rastimo-zajedno',
    name: 'Rastimo zajedno',
    area: 'Somatopedija i defektologija',
    short: 'Razvoj motorike, pažnje i socijalnih veština uz stručnjaka defektologa.',
    description:
      'Program koji vodi defektolog-somatoped. Kroz igru i pokret radimo na finoj i gruboj motorici, koordinaciji, pažnji i saradnji u grupi. Pogodno i kao savetodavni segment za roditelje.',
    activities: [
      'Senzomotorni poligon i igre koordinacije',
      'Aktivnosti za finu motoriku i grafomotoriku',
      'Igre pažnje, čekanja reda i saradnje',
      'Kratak savetodavni razgovor sa roditeljima (po želji)',
    ],
    outcome: 'Roditelji dobijaju preporuke za igru i podsticaj razvoja kod kuće.',
    ages: '2–8 godina',
    duration: '45–60 min',
    groupSize: 'do 10 dece',
    color: 'blue',
    icon: 'sprout',
  },
  {
    slug: 'disco-carolija',
    name: 'Disco čarolija',
    area: 'Ples i balet',
    short: 'Ples, osnovni baletski pokreti i mala koreografija za kraj.',
    description:
      'Energična radionica pokreta: zagrevanje kroz igru, osnove baleta i plesa, rad na ritmu i držanju, a na kraju zajednička mini-koreografija koju deca izvedu pred roditeljima ili kolegama.',
    activities: [
      'Zagrevanje i igre pokreta',
      'Osnovni baletski i plesni koraci',
      'Učenje kratke koreografije',
      'Mini-nastup na kraju programa',
    ],
    outcome: 'Nastup koji roditelji snime, a deca dugo pamte.',
    ages: '3–10 godina',
    duration: '45–60 min',
    groupSize: 'do 20 dece',
    color: 'red',
    icon: 'sparkle',
  },
  {
    slug: 'robo-avantura',
    name: 'Robo avantura',
    area: 'Robotika i računari',
    short: 'Prvi koraci u robotici, logici i programiranju — kroz igru, ne kroz ekran.',
    description:
      'Deca sklapaju, programiraju i pokreću jednostavne robote, rešavaju logičke zadatke i uče kako računar „razmišlja“. Akcenat je na zajedničkom rešavanju problema, a ne na pasivnom gledanju u ekran.',
    activities: [
      'Sklapanje i pokretanje robota',
      'Programiranje bez ekrana (kartice, putanje, komande)',
      'Logičke misije u timovima',
      'Za starije: uvod u vizuelno programiranje',
    ],
    outcome: 'Tim koji je robota proveo kroz celu misiju — i diploma mladog inženjera.',
    ages: '5–12 godina',
    duration: '60 min',
    groupSize: '8–14 dece',
    color: 'navy',
    icon: 'robot',
  },
  {
    slug: 'spremni-za-5',
    name: 'Spremni za 5',
    area: 'Logoped i priprema za školu',
    short: 'Govor, pažnja, grafomotorika i predčitalačke veštine uz logopeda.',
    description:
      'Program pripreme za školu koji vode logoped i pedagog. Kroz igru proveravamo i podstičemo izgovor, glasovnu analizu, pažnju, pamćenje i grafomotoriku — veštine koje detetu olakšavaju polazak u školu.',
    activities: [
      'Igre glasova, slogova i rima',
      'Zadaci pažnje i pamćenja',
      'Grafomotorika i držanje olovke',
      'Kratka povratna informacija roditeljima',
    ],
    outcome: 'Roditelj dobija kratku preporuku šta dalje da vežba sa detetom.',
    ages: '4–7 godina',
    duration: '45–60 min',
    groupSize: 'do 10 dece',
    color: 'yellow',
    icon: 'pencil',
  },
  {
    slug: 'mala-skola-fotografije',
    name: 'Mala škola fotografije',
    area: 'Fotografija',
    short: 'Osnove kadra, svetla i rada sa pravim aparatima.',
    description:
      'Deca uče kako fotograf „zaustavlja“ trenutak: kadar, svetlo, perspektiva. Rade sa pravim aparatima, fotografišu jedni druge i predmete, a najbolje fotografije biraju zajedno.',
    activities: [
      'Upoznavanje sa aparatom i bezbedno rukovanje',
      'Igre kadra i perspektive',
      'Portret i mrtva priroda u mini-studiju',
      'Izbor i komentarisanje fotografija',
    ],
    outcome: 'Odštampana fotografija ili foto-razglednica koju je dete snimilo.',
    ages: '6–12 godina',
    duration: '60 min',
    groupSize: 'do 12 dece',
    color: 'blue',
    icon: 'camera',
  },
  {
    slug: 'mali-arhitekti',
    name: 'Mali arhitekti',
    area: 'Prostor i oblici',
    short: 'Oblici, prostor i gradnja maketa — od skice do modela.',
    description:
      'Radionica u kojoj deca razmišljaju kao arhitekte: crtaju plan, biraju materijale i grade maketu kuće, mosta ili čitavog grada u timu. Uče o oblicima, stabilnosti i saradnji.',
    activities: [
      'Skiciranje sopstvenog plana',
      'Gradnja maketa od kartona i prirodnih materijala',
      'Timski zadatak: gradimo kvart',
      'Mini-izložba radova',
    ],
    outcome: 'Maketa koju dete nosi kući.',
    ages: '5–11 godina',
    duration: '60 min',
    groupSize: 'do 14 dece',
    color: 'orange',
    icon: 'building',
  },
];
