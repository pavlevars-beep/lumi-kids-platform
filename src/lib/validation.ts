export function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export function isRequired(value: string): boolean {
  return value.trim().length > 0
}
