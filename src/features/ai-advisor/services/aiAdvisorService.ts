// TODO: Replace mock with real AI API (Anthropic Claude or OpenAI)
// System prompt for real integration:
// "Ti si topli, iskusni edukator i savetnik za roditelje. Odgovaraš na pitanja o vaspitanju dece,
//  emocijama, razvoju i svakodnevnim situacijama. Nikada ne postavljaš medicinske dijagnoze.
//  Uvek podsticaš roditelja da potraži stručnu pomoć kada je situacija ozbiljna.
//  Tvoj ton je topao, empatičan, bez osude i praktičan."

const RESPONSES: Array<{ keywords: string[]; response: string }> = [
  {
    keywords: ['tvrdoglav', 'necu', 'odbija', 'opire', 'ne slusa'],
    response: `Tvrdoglavost kod dece je zapravo pozitivan znak – ona pokazuje da dete počinje da gradi sopstveni identitet i pokušava da oseti autonomiju.

Umesto da se suprotstavljate direktno, pokušajte da mu date izbor unutar granica koje postavljate: "Hoćeš li sada ili za pet minuta?" To daje detetu osećaj kontrole.

Pratite i kada se tvrdoglavost pojavljuje – kada je dete umorno, gladno ili preplavljeno, mnogo je teže da sarađuje. Kratka pauza ili zagrljaj mogu promeniti situaciju.

Ako ovakvo ponašanje postaje ekstremno ili ometa svakodnevni život duže vreme, razgovor sa pedagogom ili psihologom može biti od pomoći.`,
  },
  {
    keywords: ['uznemiren', 'uznemirena', 'plac', 'uplasan', 'strah', 'anksioz', 'plaka'],
    response: `Kada dete dođe uznemireno, najvažniji korak je – biti prisutan i slušati bez rešavanja.

Recite: "Vidim da si uznemiren/a. Ovde sam, možeš mi reći." Nemojte odmah da objašnjavate, savetujete ili umanjujete ono što osećaju.

Deca često ne mogu verbalno da objasne šta osećaju. Pomozite im tako što ćete nazvati emociju: "Izgledaš uplašeno. Da li je to to?"

Kada se dete smiri, tada možete pričati o razlogu. Uznemirenost je signal, a ne problem koji treba odmah rešiti. Ako primetite učestale epizode anksioznosti, potražite podršku dečjeg psihologa.`,
  },
  {
    keywords: ['granica', 'vikanje', 'vikam', 'ljutim', 'kazna', 'bez vikanja'],
    response: `Postavljanje granica bez vikanja je veština koja se uči – i savršeno je normalno da nam ponekad izmakne.

Pokušajte "kratku i jasnu" granicu: spustite se na visinu deteta, tiho i jasno recite šta ne sme i šta se dešava: "Ne smeš da udaraš. Sada idemo na pauzu."

Vikanje često pojačava situaciju jer dete reaguje na naš stres, a ne na poruku. Kratka rečenica izrečena mirnim glasom ima veći uticaj od dugog objašnjenja.

Ako osećate da vam je granica puna, napravite kratku pauzu i sami – to nije slabost, to je mudrost.`,
  },
  {
    keywords: ['talenat', 'poseban', 'darovit', 'interesuje', 'zanima', 'voli'],
    response: `Lepo je kada primetite nešto posebno u vašem detetu!

Najvažnije je posmatrati bez preterivanja – deca osećaju pritisak čak i kada dolazi iz ljubavi. Ponudite prilike bez nametanja: "Primetio/la sam da te ovo zanima. Hoćeš da probamo zajedno?"

Dajte im slobodu da i odustanu bez razočaranja s vaše strane. Talenat se razvija na duže staze, a dete treba da oseti da ga volite bez obzira na "uspeh".

LumiKids radionice su osmišljene upravo da pomognu deci da istraže različita područja bez pritiska i evaluacije.`,
  },
  {
    keywords: ['skola', 'ucenje', 'domaci', 'motivacij', 'ocena'],
    response: `Motivacija za učenje je intrinzična – dolazi iznutra, a naš zadatak je da je ne ugasimo spoljnim pritiscima.

Pokušajte da učenje povežete sa detetovim interesovanjem. Domaći zadaci su manje stresni ako postoji rutina – isto vreme, isto mesto, bez ekrana.

Kratke pauze (5 minuta posle 20 minuta rada) su bolje od maratonskih sesija.

Ako dete konzistentno ima teškoće u školi, razgovor sa pedagogom ili defektologom može otkriti da li postoji specifična teškoća u učenju.`,
  },
  {
    keywords: ['smiri', 'smiriti', 'kriza', 'tantruma', 'besno', 'ljuto', 'preplav'],
    response: `Kada je dete u emocionalnoj krizi, mozak je "preplavljen" – racionalni deo ne radi dobro. Reči tada retko pomažu.

Najkorisnija stvar je fizička prisutnost: budite blizu, smirenim glasom recite "Tu sam". Ako dete to prihvata, lagani dodir može pomoći.

Ne pokušavajte da rešite situaciju dok je dete u krizi. Sačekajte da se smiri, a zatim zajedno razgovarajte o tome šta se desilo.

Posle krize ne kažnjavajte – dete nije biralo da bude preplavljeno. Umesto toga, pomozite mu da nauči da prepozna rane znake uznemirenosti.`,
  },
]

const DEFAULT_RESPONSE = `Razumem da ste u situaciji koja zahteva razmišljanje i podršku.

Svako dete i svaka porodica su različiti, pa ne postoji jedan odgovor koji odgovara svima. Ono što uvek pomogne:

– Biti prisutan i slušati dete
– Nazvati emociju, ne odmah tražiti rešenje
– Dati detetu osećaj sigurnosti i prihvaćenosti
– Biti strpljiv prema sebi – roditeljstvo je i za odrasle učenje

Za složenije situacije, razgovor sa pedagogom, psihologom ili defektologom može pružiti personalizovanu podršku.

LumiKids Studio je tu da vam pomogne kroz korisne tekstove, radionice i resurse za celu porodicu.`

export async function askAdvisor(question: string): Promise<string> {
  await new Promise(r => setTimeout(r, 1200))
  const q = question.toLowerCase()
  for (const entry of RESPONSES) {
    if (entry.keywords.some(k => q.includes(k))) return entry.response
  }
  return DEFAULT_RESPONSE
}
