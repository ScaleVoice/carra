import { isOdd } from 'utils/math'

export function formatPricingNumber(value?: number) {
  if (!value) {
    return '-'
  }

  return value.toFixed(2)
}

export const carGradeOptions = ['1', '2', '3', '4', '5'].map(grade => ({
  value: grade,
  label: grade
}))

export const getCarPriceAreaCoordinates = (webPriceList: number[]) => {
  const centerPoint = webPriceList.length / 2
  const shouldHaveSameCoordinates = webPriceList.length < 10

  const start = isOdd(centerPoint)
    ? Math.floor(centerPoint) - 1
    : Math.floor(centerPoint)
  const end = shouldHaveSameCoordinates
    ? start
    : start !== Math.ceil(centerPoint)
    ? Math.ceil(centerPoint)
    : start + 1

  return { start, end }
}

export const priceTickFormatter = (value: any) => {
  const formattedValue =
    value >= 1000000
      ? `${(value / 1000000).toFixed(2)}M`
      : value >= 1000
      ? `${(value / 1000).toFixed(0)}k`
      : value

  return formattedValue
}
