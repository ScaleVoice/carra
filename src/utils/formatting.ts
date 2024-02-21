import { addHours, format, formatDistanceStrict, Locale } from 'date-fns'
import { isNotNil, Maybe } from 'utils/types'

interface Address {
  streetNameAndNumber: Maybe<string>
  postCode: Maybe<string>
  country: Maybe<string>
  city: Maybe<string>
}

export function formatAddress(address: Address, variant: 'short' | 'full') {
  if (variant === 'short') {
    return [address.streetNameAndNumber, address.city]
      .filter(isNotNil)
      .join(', ')
  }

  return [
    address.streetNameAndNumber,
    address.city,
    [address.country, address.postCode].filter(isNotNil).join(' ')
  ]
    .filter(isNotNil)
    .join(', ')
}

export function formatNum(
  amount?: number | string,
  options?: Intl.NumberFormatOptions,
  locales?: string | string[]
): string | null {
  if (amount === undefined) return null
  try {
    const n = typeof amount === 'number' ? amount : parseFloat(amount)
    return new Intl.NumberFormat(locales, options).format(n)
  } catch (err) {
    return null
  }
}

// As discussed in WEB-407, the amount shall be rounded down
// to the integer. This may change in the future, as BE shall
// return the normalized value directly from the API
function normalizeEur(amount: number) {
  return Math.floor(amount)
}

export function formatEur(
  amount?: number,
  locales?: string | string[]
): string | null {
  return formatNum(
    amount != null ? normalizeEur(amount) : amount,
    {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    },
    locales
  )
}

export function formatEurDecimals(
  amount?: number,
  locales?: string | string[],
  minimumFractionDigits = 0
): string | null {
  return formatNum(
    amount,
    {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits,
      maximumFractionDigits: 2
    },
    locales
  )
}

export function formatKm(
  amount?: number | string,
  locales?: string | string[]
): string | null {
  return formatNum(amount, { style: 'unit', unit: 'kilometer' }, locales)
}

export const formatDate = (
  date: Date,
  formatting: string,
  locale?: Locale
): string => {
  return format(date, formatting, { locale })
}

export function formatHours(hours: number, locale?: Locale) {
  const from = new Date()
  const to = addHours(from, hours)
  return formatDistanceStrict(from, to, { unit: 'hour', locale })
}
