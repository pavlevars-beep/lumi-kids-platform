// Galerija. Fotografije su u public/galerija/. Novu dodaj kao red ovde.
// wide: zauzima dve kolone u mreži.
export type Photo = { src: string; alt: string; caption?: string; wide?: boolean };

const g = (file: string, alt: string, caption?: string, wide = false): Photo => ({ src: `/galerija/${file}.webp`, alt, caption, wide });

export const gallery: Photo[] = [
  g('zajednicko-stvaranje', 'Tata pomaže sinu tokom radionice, pored njih devojčica crta', 'Roditelji i deca stvaraju zajedno', true),
  g('mala-naucnica', 'Devojčica meša sastojke u čaši tokom naučne radionice', 'Mali naučnici'),
  g('roditelji-i-deca-u-studiju', 'Pun studio: deca rade za stolovima, roditelji sede uz njih', 'Radionica za decu i roditelje', true),
  g('tata-pomaze-na-radionici', 'Otac pomaže deci da izvedu ogled za stolom', 'Uz pomoć roditelja'),
  g('voditeljka-vodi-radionicu', 'Voditeljka se naginje nad sto i pokazuje deci sledeći korak', 'Voditeljka vodi grupu'),
  g('mali-naucnici-u-akciji', 'Dečak i devojčica kapaljkom prenose obojenu vodu', 'Eksperiment sa bojama', true),
  g('mama-i-najmladji', 'Mama sa najmlađim polaznikom za radnim stolom', 'Program i za najmlađe'),
  g('deca-eksperimentisu', 'Deca za stolom rade sa činijama i bojama', 'Svako dete na svojoj stanici'),
  g('ogled-sa-mlekom', 'Grupa dece izvodi ogled sa mlekom i bojama', 'Ogled sa mlekom i bojama', true),
  g('tata-i-sin', 'Nasmejani otac grli sina za stolom', 'Uspomena za celu porodicu'),
  g('grupa-za-stolom', 'Veća grupa dece radi za zajedničkim stolom', 'Rad u maloj grupi'),
  g('devojcica-mesa-ogled', 'Devojčica pažljivo meša tečnost u posudi', 'Koncentracija i radoznalost'),
  g('igra-u-igraonici', 'Mlađa deca se igraju u igraonici sa planinama na zidu', 'Kutak za najmlađe', true),
  g('osvezenje-za-decu', 'Sto sa kolačima i sokovima u Lumi Kids bojama', 'Osveženje'),
  g('radionica-roditelji-i-deca', 'Deca rade za stolom dok roditelji stoje i prate', 'Roditelji uz decu'),
  g('deca-rade-zajedno', 'Deca zajedno rade na ogledu', 'Saradnja u grupi'),
  g('pripremljen-prostor', 'Uređen prostor sa balonima i Lumi Kids bannerom pre početka', 'Prostor spreman pre dolaska dece', true),
  g('slatki-sto', 'Krofne sa Lumi Kids oznakama na drvenom poslužavniku', 'Detalji koji se pamte'),
  g('atmosfera-radionice', 'Atmosfera u studiju tokom radionice', 'Atmosfera'),
  g('ulaz-u-studio', 'Ulaz u Lumi Kids studio ukrašen balonima', 'Dobrodošlica'),
];
