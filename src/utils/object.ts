import { Maybe } from './types'

export function isObjectEmpty(obj: Record<string, unknown>) {
  return Object.entries(obj).length === 0
}

export function omitNilValues<V>(obj: Record<string, Maybe<V>>) {
  const result: Record<string, V> = {}

  for (const [key, value] of Object.entries(obj)) {
    if (value === undefined || value === null) {
      continue
    }

    result[key] = value
  }

  return result
}
