-- 3 nove radionice za jul/avgust 2026 + slike za tekstove

-- Radionice
INSERT INTO workshops (
  title, slug, topic_category, date, start_time, end_time,
  age_group, short_summary, full_description, learning_goals,
  location, capacity, price,
  featured_image_type, featured_image_url,
  registration_form_url, status
) VALUES
(
  'Pozorišna igraonica',
  'pozorisnaigraonica',
  'Acting',
  '2026-07-05',
  '10:00', '11:30',
  '5–9',
  'Deca kroz igru, improvizaciju i kratke scenice otkrivaju radost izražavanja, saradnje i zajedničkog stvaranja.',
  'Na ovoj radionici deca postaju mali glumci. Kroz vođene improvizacije, ritmičke pokrete i kratke scenice deca uče da se izražavaju glasom i telom, razvijaju empatiju i hrabrost da stanu pred publiku. Nema scenarija, nema pritiska – samo igra i zajednička kreacija u sigurnom okruženju. Svako dete dobija prostor da zasja na svoj jedinstven način.',
  'Razvoj samopouzdanja i govorne ekspresije, grupna saradnja, razumevanje emocija kroz ulogu, sloboda kreativnog izražavanja.',
  'LumiKids Studio, Svetolika Rankovića 27/11, Kragujevac',
  10,
  1600,
  'upload',
  'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=80',
  'https://docs.google.com/forms/d/e/1FAIpQLSf8example/viewform',
  'published'
),
(
  'Fotografija za male istraživače',
  'fotografija-za-male-istrazivace',
  'Photography',
  '2026-07-19',
  '10:30', '12:00',
  '7–12',
  'Deca uče da gledaju svet kroz objektiv, prepoznaju svetlost, kompoziciju i priču u jednoj fotografiji.',
  'Radionica je dizajnirana za decu koja su radoznala i vole da posmatraju svet oko sebe. Uz jednostavne fotoaparate ili tablete, polaznici uče osnove kompozicije, igre sa svetlošću i pronalaženja priče u svakodnevnim trenucima. Na kraju radionice svako dete odlazi kući sa setom fotografija koje je samo napravilo – i ponosom prvog fotografa. Materijal: doneti tablet ili koristiti studio telefon.',
  'Posmatranje i vizuelno mišljenje, osnove kompozicije, pripovedanje kroz sliku, strpljenje i fokus.',
  'LumiKids Studio, Svetolika Rankovića 27/11, Kragujevac',
  8,
  1800,
  'upload',
  'https://images.unsplash.com/photo-1588776814546-1ffbb1ec0776?w=800&q=80',
  'https://docs.google.com/forms/d/e/1FAIpQLSf8example/viewform',
  'published'
),
(
  'Logopedska igraonica – Priče i glasovi',
  'logopedska-igraonica-price-i-glasovi',
  'Speech Therapy',
  '2026-08-02',
  '09:30', '10:30',
  '3–6',
  'Kroz pesme, priče i govorne igre deca razvijaju izgovor, rečnik i ljubav prema rečima u opuštenoj i zabavnoj atmosferi.',
  'Ovu radionicu vodi logoped koji kroz igru, pesmu i priču pomaže deci da razviju jasnoću govora, prošire rečnik i zavole komunikaciju. Radionica nije terapija – već preventivni, podsticajni program za sve mlade govornike. Posebno korisna za decu pred polazak u vrtić ili školu koja trebaju podstrek u izražavanju. Grupe su male (max 8 dece) kako bi svako dete dobilo individualnu pažnju.',
  'Artikulacija glasova, razvoj rečnika, ritam i melodija govora, slušanje i razumevanje, samopouzdanje u komunikaciji.',
  'LumiKids Studio, Svetolika Rankovića 27/11, Kragujevac',
  8,
  1400,
  'upload',
  'https://images.unsplash.com/photo-1567057419565-4349c49d8a04?w=800&q=80',
  'https://docs.google.com/forms/d/e/1FAIpQLSf8example/viewform',
  'published'
)
ON CONFLICT (slug) DO NOTHING;

-- Slike za tekstove – postavljamo featured_image_url na osnovu kategorije
-- (UPDATE po kategoriji; tekstovi bez slike dobijaju odgovarajuću fotografiju)

UPDATE articles
SET
  featured_image_type = 'upload',
  featured_image_url = CASE
    WHEN category = 'Parenting'
      THEN 'https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?w=800&q=80'
    WHEN category = 'Child Development'
      THEN 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800&q=80'
    WHEN category = 'Emotions & Behavior'
      THEN 'https://images.unsplash.com/photo-1484665754804-74b091211472?w=800&q=80'
    WHEN category = 'Creativity'
      THEN 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80'
    WHEN category = 'Talent Exploration'
      THEN 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80'
    WHEN category = 'Studio News'
      THEN 'https://images.unsplash.com/photo-1568952433726-3896e3881c65?w=800&q=80'
    ELSE 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=80'
  END
WHERE featured_image_url IS NULL OR featured_image_url = '';

-- Finiji targeting po naslovu za prenatal/beba tekstove koji su vec uneti
UPDATE articles SET featured_image_url = 'https://images.unsplash.com/photo-1531983412531-1f49a365ffed?w=800&q=80'
WHERE title ILIKE '%prenatal%' OR title ILIKE '%trudnoć%' OR title ILIKE '%bebi%' OR title ILIKE '%beba%' OR title ILIKE '%novorođen%';

UPDATE articles SET featured_image_url = 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&q=80'
WHERE title ILIKE '%dojenje%' OR title ILIKE '%majka%' OR title ILIKE '%dojenač%';

UPDATE articles SET featured_image_url = 'https://images.unsplash.com/photo-1587616211892-b8e7f8f4d2f3?w=800&q=80'
WHERE title ILIKE '%spavanje%' OR title ILIKE '%san%' OR title ILIKE '%noć%';

UPDATE articles SET featured_image_url = 'https://images.unsplash.com/photo-1601758174114-e711c0cbaa69?w=800&q=80'
WHERE title ILIKE '%govor%' OR title ILIKE '%logoped%' OR title ILIKE '%jezik%';
