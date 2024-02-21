export function parseDomainFromUrl(url?: string) {
  if (!url) {
    return ''
  }

  return new URL(url).hostname.replace('www.', '')
}
