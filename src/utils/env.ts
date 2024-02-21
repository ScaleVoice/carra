import { assertUnreachable } from 'utils/types'

export const isDev = process.env.NODE_ENV === 'development'

export type Region = 'de' | 'nl'
export type Environments = 'development' | 'production'

export function isRegion(region: Region) {
  return process.env.NEXT_PUBLIC_REGION === region
}

export function getRegion(): Region {
  switch (process.env.NEXT_PUBLIC_REGION?.toLowerCase()) {
    case 'nl':
      return 'nl'
    case 'de':
    default:
      return 'de'
  }
}

export function getDefaultLocaleForRegion() {
  const region = getRegion()

  switch (region) {
    case 'nl':
      return 'nl'
    case 'de':
      return 'de'
    default:
      return assertUnreachable(region)
  }
}
