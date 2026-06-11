-- LumiKids Studio - Seed Data

-- Workshops
INSERT INTO workshops (title, slug, description, short_description, age_group, category, duration_minutes, capacity, price_rsd, image_url, status) VALUES
(
  'Slikanje akvarelima',
  'slikanje-akvarelima',
  'Deca će naučiti osnove akvarelnog slikanja kroz zabavne vežbe i eksperimentisanje sa bojama. Radionica podstiče kreativnost i fine motoričke sposobnosti.',
  'Naučite osnove akvarelnog slikanja kroz zabavne vežbe',
  '6-8',
  'art',
  90,
  12,
  1500,
  'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600',
  'published'
),
(
  'Muzičke igre za mališane',
  'muzicke-igre-za-malisane',
  'Interaktivna muzička radionica za najmlađe. Deca istražuju zvukove, ritam i melodiju kroz igru i ples.',
  'Interaktivna muzička radionica za najmlađe',
  '3-5',
  'music',
  60,
  10,
  1200,
  'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600',
  'published'
),
(
  'Nauka kroz eksperimente',
  'nauka-kroz-eksperimente',
  'Fascinantni naučni eksperimenti prilagođeni deci. Deca otkrivaju svet nauke kroz bezbedne i zabavne eksperimente.',
  'Fascinantni naučni eksperimenti prilagođeni deci',
  '9-12',
  'science',
  120,
  15,
  2000,
  'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600',
  'published'
);

-- Articles
INSERT INTO articles (title, slug, excerpt, content, category, image_url, tags, status, published_at) VALUES
(
  'Kako podsticati kreativnost kod dece',
  'kako-podsticati-kreativnost',
  'Kreativnost je jedna od najvažnijih veština 21. veka. Evo kako možete pomoći svom detetu da razvije kreativni potencijal.',
  E'Kreativnost nije talenat sa kojim se rađamo — to je veština koja se razvija.\n\n## Slobodna igra\n\nSlobodna igra bez strukturiranih pravila daje deci prostor da istražuju, eksperimentišu i izmišljaju.\n\n## Umetnost i kreativno izražavanje\n\nCrtanje, modelovanje, pevanje i ples su prirodni načini na koje deca izražavaju sebe.',
  'razvoj',
  'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600',
  ARRAY['kreativnost', 'razvoj', 'igra'],
  'published',
  NOW()
),
(
  'Važnost igre u ranom razvoju',
  'vaznost-igre-u-ranom-razvoju',
  'Igra nije samo zabava — to je osnovni mehanizam kroz koji deca uče, razvijaju socijalne veštine i otkrivaju svet oko sebe.',
  E'Igra je posao detinjstva.\n\n## Kognitivni razvoj\n\nIgra stimuliše razvoj mozga, poboljšava pamćenje i koncentraciju.\n\n## Socijalni razvoj\n\nGrupne igre uče decu saradnji, deljenju i empatiji.',
  'igra',
  'https://images.unsplash.com/photo-1575783970733-1aaedde1db74?w=600',
  ARRAY['igra', 'razvoj', 'deca'],
  'published',
  NOW()
);
