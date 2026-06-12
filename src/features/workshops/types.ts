export type WorkshopStatus = 'draft' | 'published'
export type FeaturedImageType = 'preset' | 'upload'

export type WorkshopCategory =
  | 'Music'
  | 'Reading'
  | 'Speech Therapy'
  | 'Mini Science Kitchen'
  | 'Photography'
  | 'Architecture'
  | 'Dance'
  | 'Acting'
  | 'Other'

export interface GalleryImage {
  id: string
  workshop_id: string
  image_url: string
  sort_order: number
  created_at: string
}

export interface Workshop {
  id: string
  title: string
  slug: string
  topic_category: WorkshopCategory
  date: string
  start_time: string
  end_time: string | null
  age_group: string
  short_summary: string
  full_description: string
  learning_goals: string | null
  location: string | null
  capacity: number | null
  price: number | null
  workshop_icon_url: string | null
  featured_image_type: FeaturedImageType
  featured_image_url: string | null
  preset_image_key: string | null
  video_explainer_url: string | null
  registration_form_url: string
  status: WorkshopStatus
  created_at: string
  updated_at: string
  workshop_gallery_images?: GalleryImage[]
}

export type WorkshopInsert = Omit<Workshop, 'id' | 'created_at' | 'updated_at' | 'workshop_gallery_images'>
export type WorkshopUpdate = Partial<WorkshopInsert>
