// TODO: Replace mock with real AI API via a backend proxy (e.g. Supabase Edge Function)
// to avoid exposing API key in the browser bundle.
// System prompt: "Ti si topli, iskusni edukator i savetnik za roditelje..."

const RESPONSES: Array<{ keywords: string[]; response: string }> = [
  {
    keywords: ['tvrdoglav', 'necu', 'odbija', 'opire', 'ne slusa', 'ne sluša', 'inat', 'inati', 'prkosi', 'ne želi', 'nece'],
    response: `Znate onu situaciju – vi ste mirni, rekli ste isto po deseti put, a dete stoji tamo i gleda vas kao da je upravo odlučilo da nikad, ali nikad, neće uraditi ono što ste tražili. Uznemirujuće je, iscrpljujuće, i lako je u tom trenutku pomisliti: "Šta radim pogrešno?"

Zapravo, ništa. Tvrdoglavost i prkos su znaci da vaše dete raste i da aktivno gradi sopstveni identitet. Deca između 2 i 7 godina prolaze kroz faze snažne potrebe za autonomijom – ona žele da osete da imaju kontrolu nad nečim u svom životu. To je razvojno zdravo, ali u praksi može biti jako naporno.

Ono što obično pomaže jeste da im date izbor unutar okvira koji vi postavljate. Umesto "Obuci jaknu" – "Hoćeš plavu ili crvenu jaknu?" Dete dobija osećaj kontrole, ali cilj je isti. Ako se i dalje opire, ne ulazite u debatu – kratko, mirno, bez dugih objašnjenja: "Razumem da ne želiš. Ipak, jakna se mora obući jer idemo napolje." I zatim – tišina. Ne dokazivanje.

Pratite i kontekst: kada su najteže situacije? Uvece kada je dete umorno? Kada je gladno? Posle vrtića/škole? Ta znanja su zlata vredna jer vam govore kad da dete "ne testate" a kada im date malo više prostora. Ponekad zagrljaj pre nego što počnete da tražite nešto uradi čuda – dete se opusti i odjednom postaje saradljivije.

I da – budite strpljivi prema sebi. Nije lako. Ni vi ne biste voleli da vam neko ceo dan govori šta da radite.`,
  },
  {
    keywords: ['plac', 'plaka', 'plaće', 'plači', 'uplakan', 'plačljiv', 'jecaj', 'suze'],
    response: `Gledati dete kako plače, posebno kada ne znate tačno zašto, može da bude jako teško. Instinkt nam je da odmah rešimo situaciju, da utešimo, da zaustavimo suze. Ali ponekad – upravo ta žurba da "popravimo" stvar može detetu dati signal da su suze nešto loše, nešto što treba brzo završiti.

Deca plaču jer je to jedini način na koji znaju da iskažu nešto što ne mogu da stave u reči. Posebno mlađa deca – emocije doživljavaju celo telom, i plač je bukvalno ventil za pritisak koji se nakupio iznutra.

Ono što stvarno pomaže jeste sedeti pored deteta, biti fizički prisutan, i reći nešto jednostavno kao: "Tu sam. Plači koliko treba." Bez "Ma nije to ništa strašno", bez "Dosta, dosta" – samo prisutnost. Kada se smiri, možete reći: "Izgledaš tužno/ljuto/uplašeno. Hoćeš da mi ispričaš?" I prihvatite ako kaže ne – bitno je da zna da može.

Ako primetite da dete plače mnogo češće nego ranije, da teško utešiti ili da plač dolazi uz povlačenje, probleme sa snom ili gubitak apetita – to je signal da nešto možda nije u redu i vredi razgovarati sa dečjim psihologom. Ne zato što ima problem, već zato što zaslužuje podršku.

Vi ste već dobri roditelji jer ste se zapitali kako da pomognete.`,
  },
  {
    keywords: ['strah', 'uplašen', 'boji', 'boji se', 'anksioz', 'uznemiren', 'brige', 'nervoz', 'strepnja', 'panika'],
    response: `Strah kod dece je jedna od onih stvari koja roditeljima jako bode oči – jer ne možete da zaštitite dete od svega, a bili biste voljni da pokušate. Videti da se nešto plaši, da ima brige, da teško spava zbog nekih misli... to je bolno.

Ali strah je prirodan deo razvoja. Deca između 3 i 6 godina se često boje mraka, čudovišta, odvajanja. Starija deca razvijaju strahove vezane za školu, prijatelje, "šta će drugi reći". Sve je to normalno – problem nastaje kada strah počne da ograničava dete u svakodnevnom životu.

Ono što svakako ne pomaže jeste umanjivanje: "Ma nema čega da se plašiš, to je glupost." Dete tada ne prestaje da se boji – samo nauči da vam to ne govori. Mnogo bolje radi validacija: "Razumem da ti je to strašno. I ja se ponekad bojim nekih stvari." A zatim, polako, zajedno – istražite taj strah. Nacrtajte ga. Ispričajte priču o njemu. Pitajte dete: "Šta misliš, šta bi moglo da pomogne?"

Ako pripremateu dete za nešto čega se boji – nov vrtić, lekar, javni nastup – pomažu priče o tome šta se tačno dešava, posete pre nego što dođe "pravi dan", i posebno: vaš mirni ton. Deca čitaju naš strah kroz glas i telo mnogo pre nego kroz reči.

Ako anksioznost traje mesecima i ometa dete u normalnom funkcionisanju, potražite dečjeg psihologa – to je act of love, ne slabost.`,
  },
  {
    keywords: ['granica', 'vikanje', 'vikam', 'vika', 'ljutim', 'kazna', 'kažnjavam', 'disciplin', 'kaznim', 'bez vikanja', 'ne mogu više'],
    response: `Posle dugog dana, kada ste rekli isto četiri puta, a dete je opet uradilo baš ono što ne sme – vikanje dolazi gotovo samo od sebe. I onda posle dođe taj osećaj krivice. "Opet sam viko/la. Šta nije u redu sa mnom?"

Ništa nije u redu sa vama. Zaista. Vikanje je ljudska reakcija na frustraciju, i svaki roditelj je vikao. Pitanje nije da li, nego kako da to bude što ređe i kako da popravite vezu posle.

Jedna stvar koja jako pomaže u trenutku jeste pauza – bukvalno. Ako osetite da ćete vikati, kažite detetu: "Treba mi minut." Izađite iz sobe, dišite, i vratite se. Deca to vide kao model – i ona uče da kada su preplavljeni, mogu da naprave pauzu.

Granice bez vikanja funkcionišu kada su kratke, jasne i dosledne. Ne "Koliko puta sam ti rekao/la!" nego "Ne smeš da udaraš brata. Idemo na pauzu." Jedno pravilo, jedna posledica, bez duge debate. Deca nisu odrasli – ne trebaju im razlozi, trebaju im predvidljivost.

I kada vikanje ipak dođe – popravite to. Posle, kada ste oba mirni: "Vikao/la sam malopre i to nije bilo u redu. Žao mi je." To ne narušava autoritet – gradi poverenje. Deca koja vide roditelje koji se izvine rastu u ljude koji i sami umeju da se izvine.`,
  },
  {
    keywords: ['skola', 'škola', 'ucenje', 'učenje', 'domaci', 'domaći', 'motivacij', 'ocena', 'ocen', 'ne voli skolu', 'ne ide', 'ne želi', 'odbija školu'],
    response: `Motivacija za učenje – ovo je jedno od najtežih mesta u roditeljstvu. Posebno ako ste vi odrasli uz sistem koji je nagrađivao ocene i trud, pa ne razumete kako dete prosto... ne mari.

Evo šta se zaista dešava u mozgu: deca uče kada su radoznala, kada je bezbredno, kada je smisleno. Pritisak i strah od greške – bukvalno gase taj sistem. Mozak prelazi u odbrambeni mod i učenje prestaje. To nije lenost, to je biologija.

Prva stvar je da pogledate šta dete zaista voli – i pronađete vezu sa onim što uči. Voli dinosauruse? Matematika može biti "koliko kilograma je težio T-Rex". Voli da crta? Istorija može biti strip o nekom događaju. Zvuči kao posao, ali zapravo je kratko i transformiše celu dinamiku.

Domaći zadaci su posebna tema. Rutina mnogo pomaže – uvek isto vreme, uvek isto mesto, bez telefona i TV-a u pozadini. I kratko: 20 minuta rada, 5 minuta pauze, ponovi. Mozak dece nije napravljen za sat i po koncentracije.

Ako primetite da dete konzistentno ima teškoće – čita sporo, meša slova, teško se koncentriše – ne čekajte. Razgovarajte sa pedagogom u školi ili potražite defektologa. Specifične teškoće u učenju (disleksija, ADHD) su česte i rešive, ali samo ako se prepoznaju na vreme.

I jedna stvar: ocene nisu mera inteligencije. Ako vaše dete zna da to znate – pola posla je urađeno.`,
  },
  {
    keywords: ['kriza', 'tantrum', 'besno', 'besan', 'ljuto', 'ljut', 'preplav', 'eksplodira', 'histeri', 'meltdown', 'ne može da se smiri'],
    response: `Taj momenat kada dete "pukne" – vrišti, baca stvari, udara, pada na pod – može da bude paralizujuć. Posebno na javnom mestu. Posebno kada ne znate šta je okidač.

Šta se dešava u mozgu deteta u takvom trenutku: prefrontalni korteks – deo koji razmišlja logično, koji sluša, koji razgovara – bukvalno je "offline". Dete nije tvrdoglavo, nije vas napalo, nije vam neprijatelj. Ono je preplavljeno emocijama koje ne ume da reguliše.

To znači: reči ne rade. Objašnjenja, kazne, nagrade – ništa od toga ne prolazi dok je kriza u toku. Jedino što radi je smirena fizička prisutnost. Budite blizu. Tihi glas: "Tu sam. Prolazi." Ako dete prihvata dodir – lagana ruka na leđima. Ako ne – nemojte insistirati.

Sačekajte. Kriza će proći. Kada vidite da se dete počelo smirivati – tek tada možete da razgovarate, lagano: "Šta se desilo? Kako si se osetio/la?" Bez krivice, bez "Vidiš šta si uradio/la." Samo radoznalost.

Posle krize ne kažnjavajte – ona je već bila kazna sama po sebi. Umesto toga, naučite dete da prepozna rane znake: "Šta osećaš u telu kada si jako ljut?" Stomak se steže? Ruke se skupljaju? Ta svest o telu je prvi korak ka samoregulaciji.

Ako krize dolaze svakodnevno, traju dugo ili se intenzitet ne smanjuje kako dete raste – to zaslužuje pažnju stručnjaka. Ne zato što nešto nije u redu sa detetom – već zato što može dobiti alate koji mu pomažu.`,
  },
  {
    keywords: ['talenat', 'poseban', 'darovit', 'interesuje', 'zanima', 'voli', 'dobar u', 'odlična u', 'nadarena', 'nadareno'],
    response: `Primetili ste nešto u svom detetu – neku iskru, nešto što ga odvaja – i sada se pitate šta s tim. Da li gurnete, podržite, upišete, sačekate? To je lepa, ali i delikatna pozicija.

Deca osećaju naša očekivanja pre nego što ih izgovorimo. Ako postane "nadareno dete koje mora da uspe", pritisak može da ugasi upravo ono što je bilo tako lepo videti. Zato – polako.

Najvažnija stvar je podrška bez nametanja. Ponudite prilike: kurs, knjiga, radionica, zajednička aktivnost – bez da pravite plan o tome gde to treba da stigne. Pitajte dete: "Da li ti je zabavno?" i slušajte odgovor. Ako odgovor promeni kroz vreme – to je potpuno u redu.

Isto tako, ne "specijalizujte" previše rano. Dete koje je sad odlično u crtanju, sutra može biti fascinirano muzikom. Neka istraži. Najvažnije veštine – uporan rad, radoznalost, suočavanje sa neuspehom – ne dolaze iz jednog talenta, nego iz slobode da se proba mnogo toga.

LumiKids radionice su zamišljene upravo za ovakve situacije – prostor gde dete može da istraži bez pritiska ocenjivanja. Možda bi vaše dete uživalo?

I zapamtite: vaše dete je posebno ne zato što je talentovano u nečemu, već zato što je vaše. To mora da oseti pre svega ostalog.`,
  },
  {
    keywords: ['brat', 'sestra', 'bratic', 'sestrić', 'sukob', 'svađa', 'tuče', 'ljubomor', 'ljubomoran', 'zavidna', 'novo dete', 'novi beba'],
    response: `Odnosi između braće i sestara su jedni od najvažnijih – i najkompleksnijih – odnosa u životu deteta. Svađe, ljubomora, takmičenje za pažnju... sve to može da izgleda kao kaos, ali je zapravo škola socijalnih veština.

Ono što deca ne rade – ne žele svesno da vas izluđuju ili da uvreduju brata/sestru. Ono što rade jeste bore se za resurs koji doživljavaju kao ograničen: vašu pažnju, ljubav, prostor u porodici. Kada novo dete dođe na scet, starije dete ne misli "kakva radost, prijatelj za ceo život" – ono misli "nešto moje je uzeto."

Neke stvari koje pomažu: dajte svakom detetu posebno vreme samo sa vama, makar kratko svakog dana. Bez brata/sestre. Posebno sa starijim detetom posle dolaska bebe – to je ono koje je "izgubilo" status jedinog. Vikend ujutru, ili pred spavanje – čitanje, razgovor, bilo šta što mu govori: "Vidin te. Ti si poseban/na za mene."

Kada se deca svađaju – ne sudite ko je kriv. Umesto "Ko je počeo?", probajte "Vidim dvoje ljutih dece. Kako možemo da rešimo ovo zajedno?" Dajte im alate za pregovaranje, a ne presude odozgo.

Rivalitet ne nestaje – ali se transformiše. Deca koja su znala da se žestoko svađaju mogu biti najbliža prijatelji u odraslom dobu. Vaš posao nije da eliminišete sukob, nego da im pomognete da nauče da ga reše.`,
  },
  {
    keywords: ['ekran', 'telefon', 'tablet', 'igric', 'igrica', 'youtube', 'video', 'zavisnost', 'ne može bez', 'ceo dan'],
    response: `Ovo je jedno od najčešćih i najtežih pitanja koje roditelji postavljaju danas – i potpuno razumem zašto. Ekrani su svuda, deca ih vole, a mi se brinemo da li im štete i kako da postavimo granice a da ne dođe do rata u kući svaki put.

Prvo, kontekst: ekrani sami po sebi nisu neprijatelji. Razlika je u tome šta dete gleda/igra, koliko dugo i šta se dešava pre/posle. Pasivno skrolovanje i YouTube preporučeni video za videom nije isto što i kreativna igra, crtanje uz video, ili interaktivna edukativna igra.

Ono što zaista pomaže jeste rutina – ne zabrana, rutina. "Ekrani se koriste od X do Y sati, posle večere ili posle domaćeg." Kada postoji predvidljivo vreme, deca manje traže jer znaju kada dolazi. Spontano uzimanje i davanje ekrana, naprotiv, kreira konstantnu pregovaračku bitku.

Pravilo "ekran kao nagrada" ili "ekran umesto kazne" dugoročno ne radi – to povećava vrednost ekrana u umu deteta i čini ga još poželjnijim.

Umesto zabrane, ponudite alternative koje su barem podjednako privlačne. Šta vaše dete voli osim ekrana? Čak i malo? Gradnja, crtanje, kuvanje zajedno, vožnja bicikla? Razvijanje tih aktivnosti dugoročno pomera balans.

I jedna realna napomena: ako vi sami često koristite telefon pred detetom, ono to vidi i oponaša. Nije to kritika – to je samo informacija koja nam svima može pomoći.`,
  },
  {
    keywords: ['san', 'spavanje', 'ne spava', 'loše spava', 'budi se', 'ne ide na spavanje', 'noćni strah', 'mora', 'ritam'],
    response: `San je jedna od onih stvari koja, kada ne funkcioniše, ruši sve ostalo – i za dete i za vas. Umorno dete je teže dete. Neispavan roditelj je teži roditelj. Cela porodica trpi.

Najvažnija stvar za dečji san je predvidljiva rutina pred spavanje. Mozak dece reaguje na signale: kupanje → piđama → priča → ljubac → laku noć. Uvek isti redosled. Ta rutina počinje da deluje kao "signal za spavanje" i bukvalno priprema mozak da se isključi.

Vreme je isto važno. Deca imaju biološki sat koji je osetljiv na poremećaje – kasno leganje vikendom može da poremeti ritam do srede. Idealno leganje za predškolce je između 19 i 20h, za školsku decu između 20 i 21h (vaši uslovi i raspored, naravno, određuju šta je moguće).

Ekrani bar sat vremena pre spavanja – ne. Plavo svetlo kočisi melatonin, i dete koje je gledalo tablet može biti bunije nego pre. Zamena sa pričom, mirnom igrom ili razgovorom radi bolje.

Ako dete ima noćne strahove – ne budi ga, ne pričajte sa njim tokom epizode, samo budite blizu i govorite mirno. Ujutru obično ništa ne pamti.

Ako problemi sa snom traju dugo, dete se budi jako rano ili jako kasno, ili ima apneju (hrkanje s prekidima disanja) – potražite pedijatra. San nije luksuz, to je fiziološka potreba.`,
  },
  {
    keywords: ['hrana', 'jede', 'ne jede', 'izbirljiv', 'izbirljiva', 'odbija hranu', 'mrsav', 'ne raste', 'prehrambene'],
    response: `"Neću to da jedem." Četiri reči koje mogu da pretvore ručak u bojno polje. Znam – i razumem koliko je to frustrirajuće, posebno kada se trudite da pripremite nešto zdravo i ukusno.

Deca su evoluciono oprezna prema novoj hrani – to je bio zaštitni mehanizam. Mlađa deca posebno mogu biti izrazito izbirljiva, a to je razvojno normalno između 2 i 7 godina. Ne znači da će zauvek jesti samo beli pirinač i kečap.

Ono što definitivno ne pomaže: sile, pretnje, nagrade ("pojedi još tri zalogaja pa dobijаš slatkiš"), jako hvaljenje kada pojede nešto. Sve to stvara emocionalnu napetost oko hrane koja može potrajati godinama.

Ono što pomaže: redovni obroci u isto vreme, mali porcije novih namirnica pored poznatih (bez komentara), uključivanje deteta u kupovinu i pripremanje hrane. Deca koja su "pomogla" da se nešto napravi, mnogo češće probaju.

Pravilo podele odgovornosti koje psiholozi nutricionisti preporučuju: vi odlučujete ŠTA je na stolu i KADA se jede. Dete odlučuje DA LI i KOLIKO jede od onoga što je ponuđeno. Kada preuzimate tu kontrolu s vaše strane i pustite detetovu stranu – napetost opada.

Ako dete mršavi, ne raste po krivulji, ili ima ekstremno ograničen repertoar hrane koji se smanjuje (ne proširuje), razgovarajte sa pedijatrom.`,
  },
  {
    keywords: ['vrtić', 'adaptacija', 'ne želi', 'plače ujutru', 'odvajanje', 'ne može bez mame', 'ne može bez tate', 'separation'],
    response: `Odvajanje je, za malo dete, bukvalno jedna od najtežih stvari na svetu. Ne dramatiziraju, ne manipulišu. Oni zapravo osećaju strah – jer vi ste njihova sigurna baza i odlazak u prostor bez vas je nepoznato.

Adaptacija na vrtić je proces, a ne događaj. Neka deca se prilagode za nedelju dana, neka za mesec. Oboje je normalno. I suze na kapiji su normalne – i ne znače da ste uradili nešto pogrešno.

Ono što jako pomaže: kratki, topli rastanci. Bez dugog odlaganja na kapiji (to pojačava anksioznost), ali i bez nestajanja bez reči. Jasno, mirno: "Mama/tata odlazi na posao. Baka/vaspitak/ica te čuva. Dolazim po tebe posle ručka." I onda idite. Deca koja se dugo rastaju na kapiji zapravo pate duže.

Ako je moguće, pošaljite sa detetom nešto "maminо" – marama koja miriše na vas, fotografija porodice, mala igračka. To je tzv. "transitional object" i ima pravo psihološko dejstvo.

Pričajte kod kuće pozitivno o vrtiću – ne "Mora da ideš" nego "Danas ćeš da se igraš sa Janom i gradiš kocke." Vizualizacija pozitivnih momenata pomaže mozgu da asocira vrtić sa nečim prijatnim.

Ako suze i anksioznost potraju više od šest nedelja i ne smanjuju se ni malo, razgovarajte sa vaspitačicom i eventualno psihologom – možda je detetu potrebna malo više podrška, i to je potpuno u redu.`,
  },
  {
    keywords: ['kazna', 'kažnjavam', 'time out', 'ugao', 'oduzimam', 'consequences', 'posledice', 'disciplina'],
    response: `Disciplina je jedna od onih oblasti gde su roditelji najviše zbunjeni – jer postoji toliko "stručnih" saveta koji se međusobno protivrečе. Kazni? Ne kazni? Nagradi? Time-out? Šta zaista radi?

Ono što istraživanja dosledno pokazuju je ovo: najefikasnije je kada su posledice logične, neposredne i umirene. Logična posledica znači da je vezana za situaciju – "Ostavio/la si bicikl napolju pa je pokisao, nema vožnje sutra." Nije iz vazduha: "Nema tableta." Deca razumeju logiku mnogo bolje od arbitrarnih kazni.

Time-out može da radi, ali samo ako nije ponižavajuć i ako ga ne koristite kao osvetu nego kao pauzu. "Idemo malo da se smirimo" – a ne "Sedi tamo i razmišljaj o tome šta si uradio/la." Mlađa deca (ispod 4) retko razumeju time-out.

Oduzimanje privilegija radi, ali kratkoročno. "Nema tableta ovaj vikend" za dete od 5 godina koje nije poslušalo danas – previše je apstraktno i daleko. "Nema tableta večeras" – to razume.

Ono što stalno radi jeste natural rapport – vaša veza sa detetom. Deca koja se osećaju blisko i sigurno sa roditeljem prirodno više sarađuju – ne iz straha od kazne, nego jer ne žele da razočaraju nekoga koga vole. To ne znači da ne postavljate granice – znači da ih gradite na temelju poverenja.

I zapamtite: cilj discipliне nije trenutna poslušnost. Cilj je da dete nauči samoregulaciju i razumevanje posledica. To je dugoročan posao.`,
  },
]

const DEFAULT_RESPONSE = `Zahvaljujem vam što ste podelili ovo sa mnom – vidim da vam je stalo i da aktivno tražite način da podržite vaše dete. To samo po sebi znači mnogo.

Svaka situacija je drugačija, i odgovoriti precizno bez poznavanja vašeg deteta i konteksta nije moguće – ali neke stvari su gotovo uvek tačne.

Deca se najbezbednije razvijaju kada znaju da ih roditelji vide, čuju i prihvataju – ne samo kada su "dobra" ili uspešna, nego i kada greše, bacaju se, plaču ili ne sarađuju. To ne znači da nema granica ili posledica – znači da im je osnova sigurna.

Kada ne znate šta da uradite, često je najmoćnija stvar da se spustite na nivo deteta, uspostavite kontakt očima i kažete: "Priметio/la sam da ti nije lako. Tu sam." Ne da odmah rešavate, nego da pokažete da ste videli.

Za složenije situacije – ne oklevajte da potražite stručnu podršku. Pedagozi, psiholozi, defektolozi su tu upravo za to, i tražiti pomoć nije znak slabosti – to je znak da vam je zaista stalo.

Ako želite, prepišite mi malo više o situaciji – rado ću pokušati da ponudim konkretnije misli.`

export async function askAdvisor(question: string): Promise<string> {
  await new Promise(r => setTimeout(r, 1400 + Math.random() * 600))
  const q = question.toLowerCase()
  for (const entry of RESPONSES) {
    if (entry.keywords.some(k => q.includes(k))) return entry.response
  }
  return DEFAULT_RESPONSE
}
