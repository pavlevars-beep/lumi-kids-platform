import { supabase, isSupabaseConfigured } from '../../../lib/supabaseClient'
import { slugify } from '../../../lib/slugify'
import type { Workshop, WorkshopInsert, WorkshopUpdate } from '../types'

const MOCK_WORKSHOPS: Workshop[] = [
  {
    id: '1',
    title: 'Mala naučna kuhinja',
    slug: 'mala-naucna-kuhinja',
    topic_category: 'Mini Science Kitchen',
    date: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
    start_time: '10:00',
    end_time: '11:00',
    age_group: '4–7',
    short_summary: 'Deca kroz bezbedne i jednostavne eksperimente otkrivaju kako nauka živi u svakodnevnim stvarima.',
    full_description: 'Kroz praktičan rad u malim grupama, deca postaju mali naučnici. Svaki eksperiment je bezbedan, fascinantan i objašnjen jednostavnim jezikom. Deca odnose kući konkretne uvide i radoznalost kao poklon.',
    learning_goals: 'Osnove naučnog razmišljanja, posmatranje i zaključivanje, rad u grupi.',
    location: 'LumiKids Studio, Beograd',
    capacity: 12,
    workshop_icon_url: null,
    featured_image_type: 'preset',
    featured_image_url: null,
    preset_image_key: 'nauka',
    video_explainer_url: null,
    registration_form_url: 'https://forms.google.com/placeholder',
    status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Muzika i pokret',
    slug: 'muzika-i-pokret',
    topic_category: 'Music',
    date: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
    start_time: '11:00',
    end_time: '12:00',
    age_group: '3–6',
    short_summary: 'Radionica koja povezuje ritam, pokret i pažljivo slušanje kroz igru i zajedničko stvaranje.',
    full_description: 'Deca otkrivaju muziku ne samo ušima, već celim telom. Kroz ritmičke igre, plesne elemente i zajednički muzički doživljaj, razvijaju koordinaciju, pažnju i radost izražavanja.',
    learning_goals: 'Razvoj ritma i koordinacije, grupno slušanje, izražavanje kroz pokret.',
    location: 'LumiKids Studio, Beograd',
    capacity: 14,
    workshop_icon_url: null,
    featured_image_type: 'preset',
    featured_image_url: null,
    preset_image_key: 'muzika',
    video_explainer_url: null,
    registration_form_url: 'https://forms.google.com/placeholder',
    status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Arhitektura za male stvaraoce',
    slug: 'arhitektura-za-male-stvaraoce',
    topic_category: 'Architecture',
    date: new Date(Date.now() + 21 * 86400000).toISOString().split('T')[0],
    start_time: '10:00',
    end_time: '11:00',
    age_group: '7–10',
    short_summary: 'Deca kroz oblike, prostor i jednostavne modele otkrivaju kako nastaju mesta u kojima živimo.',
    full_description: 'Mali arhitekti uče o prostoru, oblicima i funkciji kroz gradnju jednostavnih modela. Radionica podstiče prostorno razmišljanje, kreativnost i sposobnost planiranja.',
    learning_goals: 'Prostorno razmišljanje, kreativno planiranje, rad sa materijalima.',
    location: 'LumiKids Studio, Beograd',
    capacity: 12,
    workshop_icon_url: null,
    featured_image_type: 'preset',
    featured_image_url: null,
    preset_image_key: 'arhitektura',
    video_explainer_url: null,
    registration_form_url: 'https://forms.google.com/placeholder',
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
