const ERROR_CODES = {
  too_short: 'too_short',
  too_long: 'too_long',
  prohibited_letters: 'prohibited_letters'
} as const

export function vinIsValid(vin: string) {
  const upperVin = vin.toUpperCase()

  if (upperVin.length <= 16) {
    return {
      isValid: false,
      error: { length: upperVin.length, code: ERROR_CODES.too_short }
    }
  }

  if (upperVin.length >= 18) {
    return {
      isValid: false,
      error: { length: upperVin.length, code: ERROR_CODES.too_long }
    }
  }

  for (let index = 0; index < upperVin.length; index++) {
    const char = upperVin[index]

    if (char === 'I' || char === 'O' || char === 'Q') {
      return {
        isValid: false,
        error: {
          length: upperVin.length,
          code: ERROR_CODES.prohibited_letters
        }
      }
    }
  }

  return {
    isValid: true,
    error: undefined
  }
}
