import { isNotNil } from './types'

export const getFormatSeparators = (locales: string | string[] | undefined) => {
  const parts = new Intl.NumberFormat(locales).formatToParts(1000.1)
  const group = parts.find(i => i.type === 'group')?.value
  const decimal = parts.find(i => i.type === 'decimal')?.value
  return { group, decimal }
}

export function parseNum(
  input: string,
  locales: string | string[] | undefined
) {
  let parsedInput = input

  const { group, decimal } = getFormatSeparators(locales)

  parsedInput = parsedInput.replaceAll(group ?? '', '')

  if (isNotNil(decimal)) {
    parsedInput = parsedInput.replace(decimal, '.')
  }

  const parsedValue = parseFloat(parsedInput)

  return isNaN(parsedValue) ? 0 : parsedValue
}
