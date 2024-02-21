import merge from 'deepmerge'
import qs from 'query-string'

export type SearchParams = Record<string, unknown>

export function addSearchParams(url: string, args: SearchParams = {}): string {
  const { query: initialQuery, url: baseUrl } = qs.parseUrl(url)

  const queryObj = merge(initialQuery, args)
  const querystring = qs.stringify(queryObj, { skipNull: true })
  return querystring.length > 0 ? `${baseUrl}?${querystring}` : baseUrl
}

export function withSearchParams(link: string) {
  if (typeof window === 'undefined') return link

  const searchParams = new URLSearchParams(window.location.search)
  const params = searchParams.toString()

  return params ? link.concat(`?${params}`) : link
}
