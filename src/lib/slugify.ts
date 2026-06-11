export function slugify(text: string): string {
  const map: Record<string, string> = {
    č: 'c', c̀: 'c', s̆: 's', z̆: 'z', d: 'd',
    C̈: 'c', C̀: 'c', S̈: 's', Z̈: 'z', D: 'd',
  }
  return text
    .split('')
    .map(char => map[char] ?? char)
    .join('')
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}
