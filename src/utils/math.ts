import { Maybe } from 'utils/types'

const EPS = 1e-5
export function clamp(input: number, min: number, max: number) {
  return Math.min(Math.max(input, min), max)
}

export function isBetweenTwoValues(
  input: number,
  min: Maybe<number>,
  max: Maybe<number>
) {
  return input >= (min ?? -Infinity) && input <= (max ?? Infinity)
}

export function degreesToRadians(deg: number) {
  return (deg * Math.PI) / 180
}

export function isApproxZero(number: number, error = EPS) {
  return Math.abs(number) < error
}

export function isEven(number: number) {
  return number % 2 === 0
}

export function isOdd(number: number) {
  return !isEven(number)
}
