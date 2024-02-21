import { formatNum } from 'utils/formatting'

// empty string, numbers and a dot
export const NUMBER_INPUT_REGEXP = /^[-]?$|[-]?\d+(\.|,)?(\d+)?$/

export function defaultFormatter(value: number | null, locale?: string) {
  if (!value) {
    return ''
  }

  const formattedValue = formatNum(value, { maximumFractionDigits: 2 }, locale)

  return formattedValue ?? ''
}
