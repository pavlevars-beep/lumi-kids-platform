// Galerija. Nove fotografije ubaci u public/galerija/ i dodaj red ovde.
// Fotografije sa Instagrama (@studiolumikids) preuzmi ručno i dodaj na isti način.
export type Photo = { src: string; alt: string; caption?: string; wide?: boolean };

export const gallery: Photo[] = [
  {
    src: '/galerija/deca-studio.jpg',
    alt: 'Dvoje dece se smeje ispred Lumi Kids Studio bannera',
    caption: 'Radionica u studiju, Kragujevac',
  },
  {
    src: '/galerija/radionica-studio.jpg',
    alt: 'Najmlađi polaznik za stolićem u Lumi Kids prostoru',
    caption: 'Naš prostor u Kragujevcu',
    wide: true,
  },
];
