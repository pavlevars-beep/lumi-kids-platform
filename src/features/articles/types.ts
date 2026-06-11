export type ArticleStatus = 'draft' | 'published'
export type FeaturedImageType = 'preset' | 'upload'

export type ArticleCategory =
  | 'Parenting'
  | 'Child Development'
  | 'Emotions & Behavior'
  | 'Creativity'
  | 'Talent Exploration'
  | 'Studio News'
  | 'Other'

export interface Article {
  id: string
  title: string
  slug: string
  category: ArticleCategory
  featured_image_type: FeaturedImageType
  featured_image_url: string | null
  preset_image_key: string | null
  excerpt: string
  body: string
  author: string
  publish_date: string | null
  status: ArticleStatus
  tags: string[]
  is_premium: boolean
  created_at: string
  updated_at: string
}

export type ArticleInsert = Omit<Article, 'id' | 'created_at' | 'updated_at'>
export type ArticleUpdate = Partial<ArticleInsert>
