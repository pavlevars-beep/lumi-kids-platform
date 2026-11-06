// Tekstovi sekcija na početnoj strani.

export const audiences = [
  {
    key: 'firme',
    title: 'Firme',
    lead: 'Kids Day, novogodišnji i praznični programi za decu zaposlenih',
    text: 'HR dobija jednog partnera za ceo događaj: predlog programa, logistiku, tim na licu mesta i fotografije za porodice i internu komunikaciju.',
    featured: true,
  },
  {
    key: 'vrtici',
    title: 'Vrtići i škole',
    lead: 'Tematski dani, priredbe i serijali radionica',
    text: 'Dolazimo sa kompletnom opremom i stručnim voditeljima. Program usklađujemo sa uzrastom grupe i vašim godišnjim planom.',
  },
  {
    key: 'institucije',
    title: 'Institucije i udruženja',
    lead: 'Dani otvorenih vrata, festivali, kulturni i lokalni događaji',
    text: 'Osmišljavamo dečji sadržaj koji prati temu događaja — od jednog štanda do višečasovnog programa sa više stanica.',
  },
  {
    key: 'rodjendaonice',
    title: 'Rođendaonice i igraonice',
    lead: 'Gotov radionički program kao dodatna ponuda',
    text: 'Vaš prostor, naš program. Dovodimo voditelje i materijal, a vaši gosti dobijaju nešto više od klasične animacije.',
  },
  {
    key: 'roditelji',
    title: 'Roditelji',
    lead: 'Rođendani sa sadržajem',
    text: 'Rođendan uz radionicu po izboru — kod vas, u igraonici ili u našem prostoru — sa fotografisanjem i osveženjem po želji.',
  },
];

export const services = [
  { icon: 'idea', title: 'Koncept i scenario', text: 'Osmišljavamo program po povodu, uzrastu i broju dece, sa satnicom minut po minut.' },
  { icon: 'map', title: 'Prostor', text: 'Dolazimo u vaš prostor ili obezbeđujemo i uređujemo lokaciju za događaj.' },
  { icon: 'door', title: 'Prijem i protokol', text: 'Doček, bedževi sa imenom, raspodela po grupama, koordinator koji vodi tok programa.' },
  { icon: 'flask', title: 'Radionice', text: 'Stručni voditelji i sav materijal. Grupe po uzrastu, bez čekanja u redu.' },
  { icon: 'camera', title: 'Fotografisanje', text: 'Profesionalni fotograf (u saradnji sa Blenda Kids), scenografija i privatne galerije po porodici.' },
  { icon: 'cup', title: 'Osveženje', text: 'Sokovi, voda i grickalice prilagođeni deci, uz vođenje računa o alergijama.' },
  { icon: 'gift', title: 'Pokloni', text: 'Nabavka i pakovanje poklona, uručenje na zajedničkom finalu — po vašem budžetu.' },
  { icon: 'sparkle', title: 'Dekoracija i animacija', text: 'Tematska dekoracija, Deda Mraz ili maskota, muzika i zajedničko finale.' },
];

export const steps = [
  { title: 'Javite nam šta vam treba', text: 'Povod, okvirni datum, broj i uzrast dece. Dovoljno je par rečenica kroz formu ispod.' },
  { title: 'Dobijate predlog programa', text: 'U roku od 48 sati šaljemo koncept, satnicu, tim i jasnu ponudu u paketima.' },
  { title: 'Mi sve pripremamo', text: 'Materijal, tim, scenografija, formular saglasnosti za fotografisanje i postavka pre početka.' },
  { title: 'Isporuka i uspomene', text: 'Na dan događaja vodimo program od prijema do finala. Fotografije stižu za 5 radnih dana.' },
];

export const sampleProgram = {
  title: 'Novogodišnji program za decu zaposlenih',
  meta: ['~35 dece, 4–10 god.', '120 minuta', 'u prostoru kompanije'],
  intro:
    'Decu delimo po uzrastu na dve grupe koje rade paralelno i menjaju se na pola programa. Dok mlađi eksperimentišu, stariji se fotografišu sa Deda Mrazom — i obrnuto. Nema čekanja u redu.',
  timeline: [
    { time: '0:00', text: 'Doček, bedževi sa imenom, okupljanje uz muziku' },
    { time: '0:15', text: 'Grupa A: radionica Mali naučnici · Grupa B: fotografisanje sa Deda Mrazom' },
    { time: '0:55', text: 'Pauza uz sok i grickalice, zamena grupa' },
    { time: '1:05', text: 'Grupa A: fotografisanje · Grupa B: radionica Mali naučnici' },
    { time: '1:45', text: 'Zajedničko finale: pokloni, grupna fotografija i pozdrav' },
  ],
  team: ['2 voditelja radionice', 'koordinator programa', 'fotograf', 'Deda Mraz'],
};

export const standards = [
  { title: 'Male grupe', text: '12–16 dece po voditelju i uvek dve odrasle osobe uz grupu.' },
  { title: 'Stručni voditelji', text: 'Pedagozi, defektolozi, logopedi, muzičari i treneri — svako radi ono u čemu je stručan.' },
  { title: 'Jasna struktura', text: 'Svaka radionica ima uvod, glavni deo i završni krug. Deca znaju šta rade i zašto.' },
  { title: 'Bezbednost', text: 'Bezbedan materijal, zaštitna oprema, prva pomoć i spisak alergija za svako dete.' },
  { title: 'Privatnost', text: 'Formular saglasnosti pre događaja. Ništa ne objavljujemo bez pisane dozvole roditelja.' },
  { title: 'Rezultat koji ostaje', text: 'Svako dete nosi kući nešto što je samo napravilo — a roditelji fotografije.' },
];

export const faq = [
  {
    q: 'Koliko unapred treba da se javimo?',
    a: 'Idealno 3–4 nedelje, a za decembar i što ranije jer se termini brzo popunjavaju. Manje programe možemo organizovati i za nekoliko dana, ako je termin slobodan.',
  },
  {
    q: 'Da li dolazite kod nas ili imate svoj prostor?',
    a: 'Oba. Najčešće dolazimo u prostor firme, vrtića ili institucije sa kompletnom opremom. Ako nemate odgovarajući prostor, obezbeđujemo i uređujemo lokaciju.',
  },
  {
    q: 'Za koliko dece možete da organizujete program?',
    a: 'Od male rođendanske grupe do više od 100 dece. Kod većih događaja decu delimo po uzrastu i radimo paralelne stanice, tako da niko ne čeka.',
  },
  {
    q: 'Kako se formira cena?',
    a: 'Cena zavisi od broja dece, trajanja i onoga što uključujete (radionice, fotografisanje, pokloni, osveženje, prostor). Uvek šaljemo ponudu u paketima, da možete da izaberete nivo koji odgovara budžetu. Fakturišemo firmama uz predračun.',
  },
  {
    q: 'Kako roditelji dobijaju fotografije?',
    a: 'Preporučujemo privatnu galeriju po detetu: svaki roditelj na imejl dobija link samo sa fotografijama svog deteta. Moguća je i zbirna galerija za kompaniju, kao i štampane fotografije, kalendari i kartice.',
  },
  {
    q: 'Šta nam je potrebno od vas?',
    a: 'Datum i satnica, broj dece po uzrastu (7 dana pre događaja), kontakt osoba na dan događaja i, ako želite privatne galerije, spisak dece sa imejlom jednog roditelja. Sve ostalo je na nama.',
  },
];
