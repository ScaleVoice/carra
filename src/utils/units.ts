export const exchangePowerUnits = (
  value: number,
  to: 'kw' | 'hp',
  round = true
) => {
  if (to === 'hp') {
    const calcValue = value * 1.341
    return round ? Math.floor(calcValue) : calcValue
  }

  const calcValue = value / 1.341
  return round ? Math.ceil(calcValue) : calcValue
}
