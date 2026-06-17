import { supabase, isSupabaseConfigured } from '../../../lib/supabaseClient'
import { slugify } from '../../../lib/slugify'
import type { Workshop, WorkshopInsert, WorkshopUpdate } from '../types'

const MOCK_WORKSHOPS: Workshop[] = [
  {
    id: '1',
    title: 'Mala naučna kuhinja',
    slug: 'mala-naucna-kuhinja',
    topic_category: 'Mini Science Kitchen',
    date: '2026-07-12',
    start_time: '10:00',
    end_time: '11:00',
    age_group: '4–7',
    short_summary: 'Deca kroz bezbedne i jednostavne eksperimente otkrivaju kako nauka živi u svakodnevnim stvarima.',
    full_description: 'Kroz praktičan rad u malim grupama, deca postaju mali naučnici. Svaki eksperiment je bezbedan, fascinantan i objašnjen jednostavnim jezikom. Deca odnose kući konkretne uvide i radoznalost kao poklon.',
    learning_goals: 'Osnove naučnog razmišljanja, posmatranje i zaključivanje, rad u grupi.',
    location: 'LumiKids Studio, Svetolika Rankovića 27/11, Kragujevac',
    capacity: 12,
    price: 1500,
    workshop_icon_url: null,
    featured_image_type: 'upload',
    featured_image_url: 'https://images.unsplash.com/photo-1532094349884-543559a8e9a5?w=800&q=80',
    preset_image_key: null,
    video_explainer_url: null,
    registration_form_url: 'https://docs.google.com/forms/d/e/1FAIpQLSf8example/viewform',
    status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Muzika i pokret',
    slug: 'muzika-i-pokret',
    topic_category: 'Music',
    date: '2026-07-26',
    start_time: '11:00',
    end_time: '12:00',
    age_group: '3–6',
    short_summary: 'Radionica koja povezuje ritam, pokret i pažljivo slušanje kroz igru i zajedničko stvaranje.',
    full_description: 'Deca otkrivaju muziku ne samo ušima, već celim telom. Kroz ritmičke igre, plesne elemente i zajednički muzički doživljaj, razvijaju koordinaciju, pažnju i radost izražavanja.',
    learning_goals: 'Razvoj ritma i koordinacije, grupno slušanje, izražavanje kroz pokret.',
    location: 'LumiKids Studio, Svetolika Rankovića 27/11, Kragujevac',
    capacity: 14,
    price: 1200,
    workshop_icon_url: null,
    featured_image_type: 'upload',
    featured_image_url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80',
    preset_image_key: null,
    video_explainer_url: null,
    registration_form_url: 'https://docs.google.com/forms/d/e/1FAIpQLSf8example/viewform',
    status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Arhitektura za male stvaraoce',
    slug: 'arhitektura-za-male-stvaraoce',
    topic_category: 'Architecture',
    date: '2026-08-09',
    start_time: '10:00',
    end_time: '11:00',
    age_group: '7–10',
    short_summary: 'Deca kroz oblike, prostor i jednostavne modele otkrivaju kako nastaju mesta u kojima živimo.',
    full_description: 'Mali arhitekti uče o prostoru, oblicima i funkciji kroz gradnju jednostavnih modela. Radionica podstiče prostorno razmišljanje, kreativnost i sposobnost planiranja.',
    learning_goals: 'Prostorno razmišljanje, kreativno planiranje, rad sa materijalima.',
    location: 'LumiKids Studio, Svetolika Rankovića 27/11, Kragujevac',
    capacity: 12,
    price: 1800,
    workshop_icon_url: null,
    featured_image_type: 'upload',
    featured_image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    preset_image_key: null,
    video_explainer_url: null,
    registration_form_url: 'https://docs.google.com/forms/d/e/1FAIpQLSf8example/viewform',
    status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Pozorišna igraonica',
    slug: 'pozorisnaigraonica',
    topic_category: 'Acting',
    date: '2026-07-05',
    start_time: '10:00',
    end_time: '11:30',
    age_group: '5–9',
    short_summary: 'Deca kroz igru, improvizaciju i kratke scenice otkrivaju radost izražavanja, saradnje i zajedničkog stvaranja.',
    full_description: 'Na ovoj radionici deca postaju mali glumci. Kroz vođene improvizacije, ritmičke pokrete i kratke scenice deca uče da se izražavaju glasom i telom, razvijaju empatiju i hrabrost da stanu pred publiku. Nema scenarija, nema pritiska – samo igra i zajednička kreacija u sigurnom okruženju. Svako dete dobija prostor da zasja na svoj jedinstven način.',
    learning_goals: 'Razvoj samopouzdanja i govorne ekspresije, grupna saradnja, razumevanje emocija kroz ulogu, sloboda kreativnog izražavanja.',
    location: 'LumiKids Studio, Svetolika Rankovića 27/11, Kragujevac',
    capacity: 10,
    price: 1600,
    workshop_icon_url: null,
    featured_image_type: 'upload',
    featured_image_url: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=80',
    preset_image_key: null,
    video_explainer_url: null,
    registration_form_url: 'https://docs.google.com/forms/d/e/1FAIpQLSf8example/viewform',
    status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '5',
    title: 'Fotografija za male istraživače',
    slug: 'fotografija-za-male-istrazivace',
    topic_category: 'Photography',
    date: '2026-07-19',
    start_time: '10:30',
    end_time: '12:00',
    age_group: '7–12',
    short_summary: 'Deca uče da gledaju svet kroz objektiv, prepoznaju svetlost, kompoziciju i priču u jednoj fotografiji.',
    full_description: 'Radionica je dizajnirana za decu koja su radoznala i vole da posmatraju svet oko sebe. Uz jednostavne fotoaparate ili tablete, polaznici uče osnove kompozicije, igre sa svetlošću i pronalaženja priče u svakodnevnim trenucima. Na kraju radionice svako dete odlazi kući sa setom fotografija koje je samo napravilo – i ponosom prvog fotografa.',
    learning_goals: 'Posmatranje i vizuelno mišljenje, osnove kompozicije, pripovedanje kroz sliku, strpljenje i fokus.',
    location: 'LumiKids Studio, Svetolika Rankovića 27/11, Kragujevac',
    capacity: 8,
    price: 1800,
    workshop_icon_url: null,
    featured_image_type: 'upload',
    featured_image_url: 'https://images.unsplash.com/photo-1588776814546-1ffbb1ec0776?w=800&q=80',
    preset_image_key: null,
    video_explainer_url: null,
    registration_form_url: 'https://docs.google.com/forms/d/e/1FAIpQLSf8example/viewform',
    status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '6',
    title: 'Logopedska igraonica – Priče i glasovi',
    slug: 'logopedska-igraonica-price-i-glasovi',
    topic_category: 'Speech Therapy',
    date: '2026-08-02',
    start_time: '09:30',
    end_time: '10:30',
    age_group: '3–6',
    short_summary: 'Kroz pesme, priče i govorne igre deca razvijaju izgovor, rečnik i ljubav prema rečima u opuštenoj i zabavnoj atmosferi.',
    full_description: 'Ovu radionicu vodi logoped koji kroz igru, pesmu i priču pomaže deci da razviju jasnoću govora, prošire rečnik i zavole komunikaciju. Radionica nije terapija – već preventivni, podsticajni program za sve mlade govornike. Posebno korisna za decu pred polazak u vrtić ili školu. Grupe su male (max 8 dece) kako bi svako dete dobilo individualnu pažnju.',
    learning_goals: 'Artikulacija glasova, razvoj rečnika, ritam i melodija govora, slušanje i razumevanje, samopouzdanje u komunikaciji.',
    location: 'LumiKids Studio, Svetolika Rankovića 27/11, Kragujevac',
    capacity: 8,
    price: 1400,
    workshop_icon_url: null,
    featured_image_type: 'upload',
    featured_image_url: 'https://images.unsplash.com/photo-1567057419565-4349c49d8a04?w=800&q=80',
    preset_image_key: null,
    video_explainer_url: null,
    registration_form_url: 'https://docs.google.com/forms/d/e/1FAIpQLSf8example/viewform',
    status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

export const workshopService = {
  async getPublished(): Promise<Workshop[]> {
    if (!isSupabaseConfigured) return MOCK_WORKSHOPS
    const { data, error } = await supabase
      .from('workshops')
      .select('*')
      .eq('status', 'published')
      .order('date', { ascending: true })
    if (error) throw error
    return data as Workshop[]
  },

  async getAll(): Promise<Workshop[]> {
    if (!isSupabaseConfigured) return MOCK_WORKSHOPS
    const { data, error } = await supabase
      .from('workshops')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) throw error
    return data as Workshop[]
  },

  async getBySlug(slug: string): Promise<Workshop | null> {
    if (!isSupabaseConfigured) return MOCK_WORKSHOPS.find(w => w.slug === slug) ?? null
    const { data, error } = await supabase
      .from('workshops')
      .select('*, workshop_gallery_images(*)')
      .eq('slug', slug)
      .eq('status', 'published')
      .single()
    if (error) return null
    return data as Workshop
  },

  async getById(id: string): Promise<Workshop | null> {
    if (!isSupabaseConfigured) return MOCK_WORKSHOPS.find(w => w.id === id) ?? null
    const { data, error } = await supabase
      .from('workshops')
      .select('*, workshop_gallery_images(*)')
      .eq('id', id)
      .single()
    if (error) return null
    return data as Workshop
  },

  async create(data: WorkshopInsert): Promise<Workshop> {
    if (!isSupabaseConfigured) throw new Error('Supabase nije konfigurisan')
    const slug = slugify(data.title)
    const { data: created, error } = await supabase
      .from('workshops')
      .insert({ ...data, slug })
      .select()
      .single()
    if (error) throw error
    return created as Workshop
  },

  async update(id: string, data: WorkshopUpdate): Promise<Workshop> {
    if (!isSupabaseConfigured) throw new Error('Supabase nije konfigurisan')
    const updateData = data.title ? { ...data, slug: slugify(data.title), updated_at: new Date().toISOString() } : { ...data, updated_at: new Date().toISOString() }
    const { data: updated, error } = await supabase
      .from('workshops')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()
    if (error) throw error
    return updated as Workshop
  },

  async delete(id: string): Promise<void> {
    if (!isSupabaseConfigured) throw new Error('Supabase nije konfigurisan')
    const { error } = await supabase.from('workshops').delete().eq('id', id)
    if (error) throw error
  },

  async publish(id: string): Promise<void> {
    if (!isSupabaseConfigured) throw new Error('Supabase nije konfigurisan')
    const { error } = await supabase
      .from('workshops')
      .update({ status: 'published', updated_at: new Date().toISOString() })
      .eq('id', id)
    if (error) throw error
  },

  async unpublish(id: string): Promise<void> {
    if (!isSupabaseConfigured) throw new Error('Supabase nije konfigurisan')
    const { error } = await supabase
      .from('workshops')
      .update({ status: 'draft', updated_at: new Date().toISOString() })
      .eq('id', id)
    if (error) throw error
  },
}
