import { supabase, isSupabaseConfigured } from '../../../lib/supabaseClient'
import { slugify } from '../../../lib/slugify'
import type { Article, ArticleInsert, ArticleUpdate } from '../types'

const MOCK_ARTICLES: Article[] = [
  {
    id: '1',
    title: 'Kako da podržimo dete bez pritiska',
    slug: 'kako-da-podrzimo-dete-bez-pritiska',
    category: 'Parenting',
    featured_image_type: 'upload',
    featured_image_url: 'https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?w=800&q=80',
    preset_image_key: null,
    excerpt: 'Deci je potrebna podrška koja ih ohrabruje, ali ne opterećuje očekivanjima.',
    body: `Svaki roditelj želi da pomogne detetu da uspeje. Ali ponekad ta želja, nesvesno, postaje pritisak.

Deca osećaju naša očekivanja čak i kada ih ne izgovaramo. Osećaju napetost kada ne ispune ono što misle da od njih tražimo. I ta napetost može blokirati upravo ono što smo hteli da razvijemo – samopouzdanje, znatiželju, radost učenja.

**Šta znači prava podrška?**

Prava podrška znači biti prisutan bez uslovljavanja. Znači reći: "Vidim te, slušam te, tu sam" – bez prećutnog pitanja "Ali da li si dovoljno dobar?"

**Praktični koraci:**

- Pohvalite trud, a ne rezultat
- Dopustite detetu da pogriješi bez da vi "popravljate" odmah
- Pitajte o osećanjima, a ne samo o činjenicama
- Budite zainteresovani, a ne evaluatori

Deca koja osećaju bezuslovnu podršku hrabrija su da pokušaju, greše i rastu.`,
    author: 'LumiKids Studio',
    publish_date: new Date().toISOString().split('T')[0],
    status: 'published',
    tags: ['podrška', 'razvoj', 'roditeljstvo'],
    is_premium: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Zašto je dosada važna za kreativnost',
    slug: 'zasto-je-dosada-vazna-za-kreativnost',
    category: 'Creativity',
    featured_image_type: 'upload',
    featured_image_url: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80',
    preset_image_key: null,
    excerpt: 'Dosada nije praznina koju odmah treba popuniti, već prostor u kom dete počinje da stvara.',
    body: `U svetu u kom je svaka minuta ispunjena sadržajem, dosada zvuči kao problem koji treba rešiti. Ali istraživači nam govore nešto drugačije.

Dosada je okidač za kreativnost.

Kada dete nema ništa posebno da radi, mozak počinje da luta. A taj mentalni lutanje je upravo prostor u kom nastaju nove ideje, maštovite igre, originalna rešenja.

**Šta se dešava u mozgu?**

Kada je mozak "slobodan" od spoljnih podražaja, aktivira se tzv. "mreža pasivnog načina rada". Ova mreža je odgovorna za snovanje, maštanje i kreativno razmišljanje.

**Šta roditelji mogu da urade?**

- Dozvolite deci periode bez organizovane aktivnosti
- Oduprite se refleksu da odmah ponudite rešenje za dosadu
- Neka se dete malo pomuca sa "šta da radim"
- Budite tu, ali ne rešavajte umesto njih

Kreativnost se ne uči – ona se dešava kada ima prostora.`,
    author: 'LumiKids Studio',
    publish_date: new Date().toISOString().split('T')[0],
    status: 'published',
    tags: ['kreativnost', 'igra', 'slobodno vreme'],
    is_premium: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Kada dete kaže "neću"',
    slug: 'kada-dete-kaze-necu',
    category: 'Emotions & Behavior',
    featured_image_type: 'upload',
    featured_image_url: 'https://images.unsplash.com/photo-1484665754804-74b091211472?w=800&q=80',
    preset_image_key: null,
    excerpt: 'Tvrdoglavost često nije neposlušnost, već pokušaj deteta da oseti kontrolu, granicu ili sigurnost.',
    body: `"Neću!" – dve reči koje mogu da izazovu trenutnu frustraciju kod svakog roditelja. Ali šta se zapravo krije iza njih?

Deca koja odbijaju, često pokušavaju da nam kažu nešto mnogo složenije od pukog "ne".

**Šta "neću" zapravo znači?**

- "Osećam se preplavljeno i ne znam kako da to kažem"
- "Treba mi tvoja pažnja, a ne samo instrukcija"
- "Pokušavam da osećam da imam kontrolu nad nekim delom svog života"
- "Umoran/a sam, gladan/a, uplašen/a"

**Kako reagovati?**

Umesto da odgovorite na "neću" sa "moraš", pokušajte kratku pauzu. Stanite. Udahnite. Pitajte se: "Šta mu/joj treba u ovom trenutku?"

Ponekad rešenje nije drugačija naredba – već drugačiji pristup. Dajte izbor gde možete. Naglasite zajednicu umesto autoriteta. "Hajde da to uradimo zajedno" funkcioniše bolje od "Uradi to odmah".

**Kada tražiti pomoć?**

Ako "neću" dolazi uz ekstremnu uznemirenost, dugotrajne krize ili značajno ometa svakodnevni život, razgovor sa stručnjakom može biti od velike pomoći.`,
    author: 'LumiKids Studio',
    publish_date: new Date().toISOString().split('T')[0],
    status: 'published',
    tags: ['emocije', 'ponašanje', 'granice'],
    is_premium: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

export const articleService = {
  async getPublished(): Promise<Article[]> {
    if (!isSupabaseConfigured) return MOCK_ARTICLES
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('status', 'published')
      .order('publish_date', { ascending: false })
    if (error) throw error
    return data as Article[]
  },

  async getAll(): Promise<Article[]> {
    if (!isSupabaseConfigured) return MOCK_ARTICLES
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) throw error
    return data as Article[]
  },

  async getBySlug(slug: string): Promise<Article | null> {
    if (!isSupabaseConfigured) return MOCK_ARTICLES.find(a => a.slug === slug) ?? null
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single()
    if (error) return null
    return data as Article
  },

  async getById(id: string): Promise<Article | null> {
    if (!isSupabaseConfigured) return MOCK_ARTICLES.find(a => a.id === id) ?? null
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('id', id)
      .single()
    if (error) return null
    return data as Article
  },

  async create(data: ArticleInsert): Promise<Article> {
    if (!isSupabaseConfigured) throw new Error('Supabase nije konfigurisan')
    const slug = slugify(data.title)
    const { data: created, error } = await supabase
      .from('articles')
      .insert({ ...data, slug })
      .select()
      .single()
    if (error) throw error
    return created as Article
  },

  async update(id: string, data: ArticleUpdate): Promise<Article> {
    if (!isSupabaseConfigured) throw new Error('Supabase nije konfigurisan')
    const updateData = data.title ? { ...data, slug: slugify(data.title), updated_at: new Date().toISOString() } : { ...data, updated_at: new Date().toISOString() }
    const { data: updated, error } = await supabase
      .from('articles')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()
    if (error) throw error
    return updated as Article
  },

  async delete(id: string): Promise<void> {
    if (!isSupabaseConfigured) throw new Error('Supabase nije konfigurisan')
    const { error } = await supabase.from('articles').delete().eq('id', id)
    if (error) throw error
  },

  async publish(id: string): Promise<void> {
    if (!isSupabaseConfigured) throw new Error('Supabase nije konfigurisan')
    const { error } = await supabase
      .from('articles')
      .update({ status: 'published', publish_date: new Date().toISOString().split('T')[0], updated_at: new Date().toISOString() })
      .eq('id', id)
    if (error) throw error
  },

  async unpublish(id: string): Promise<void> {
    if (!isSupabaseConfigured) throw new Error('Supabase nije konfigurisan')
    const { error } = await supabase
      .from('articles')
      .update({ status: 'draft', updated_at: new Date().toISOString() })
      .eq('id', id)
    if (error) throw error
  },
}
