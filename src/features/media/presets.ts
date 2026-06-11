export interface ImagePreset {
  label: string
  url: string
}

export interface PresetImage {
  key: string
  label: string
  gradient: string
  icon: string
}

export const PRESET_IMAGES: PresetImage[] = [
  { key: 'music', label: 'Muzika', gradient: 'from-purple-300 to-indigo-400', icon: '🎵' },
  { key: 'art', label: 'Umetnost', gradient: 'from-pink-300 to-rose-400', icon: '🎨' },
  { key: 'science', label: 'Nauka', gradient: 'from-green-300 to-teal-400', icon: '🔬' },
  { key: 'reading', label: 'Čitanje', gradient: 'from-amber-300 to-orange-400', icon: '📚' },
  { key: 'movement', label: 'Pokret', gradient: 'from-sky-300 to-blue-400', icon: '🤸' },
  { key: 'nature', label: 'Priroda', gradient: 'from-lime-300 to-green-400', icon: '🌿' },
  { key: 'speech', label: 'Govor', gradient: 'from-violet-300 to-purple-400', icon: '💬' },
  { key: 'kids', label: 'Deca', gradient: 'from-yellow-300 to-amber-400', icon: '👧' },
]

export const WORKSHOP_IMAGE_PRESETS: ImagePreset[] = [
  { label: 'Slikanje', url: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600' },
  { label: 'Muzika', url: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600' },
  { label: 'Nauka', url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600' },
  { label: 'Deca', url: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600' },
  { label: 'Priroda', url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=600' },
  { label: 'Sport', url: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=600' },
]

export const ARTICLE_IMAGE_PRESETS: ImagePreset[] = [
  { label: 'Čitanje', url: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600' },
  { label: 'Igra', url: 'https://images.unsplash.com/photo-1575783970733-1aaedde1db74?w=600' },
  { label: 'Kreativnost', url: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600' },
  { label: 'Porodica', url: 'https://images.unsplash.com/photo-1491013516836-7db643ee125a?w=600' },
]

export function getPresetByKey(key: string | null | undefined): PresetImage | undefined {
  if (!key) return undefined
  return PRESET_IMAGES.find(p => p.key === key)
}
