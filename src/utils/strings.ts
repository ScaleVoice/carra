import {
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  isAfter
} from 'date-fns'
import { Maybe } from 'utils/types'
import { EMAIL_REGEX, UUID_REGEX } from './regex'

export const padWithZeros = (
  input: string | number,
  length: number
): string => {
  return String(input).padStart(length, '0')
}

export const safeParseInt = (input: Maybe<string>): number | undefined => {
  if (!input) {
    return undefined
  }

  const num = parseInt(input)
  return Number.isNaN(num) ? undefined : num
}

export function createTimerString(date?: Date): string {
  const currentDate = new Date()

  if (!date || isAfter(currentDate, date)) {
    return '00:00'
  }

  const hours = differenceInHours(date, currentDate)
  const hoursInMinutes = hours * 60
  const hoursInSeconds = hoursInMinutes * 60

  const minutes = differenceInMinutes(date, currentDate) - hoursInMinutes
  const minutesInSeconds = minutes * 60

  const seconds =
    differenceInSeconds(date, currentDate) - minutesInSeconds - hoursInSeconds

  const paddedHours = padWithZeros(hours, 2)
  const paddedMinutes = padWithZeros(minutes, 2)
  const paddedSeconds = padWithZeros(seconds, 2)

  let result = [paddedMinutes, paddedSeconds]
  if (paddedHours !== '00') result = [paddedHours, ...result]

  return result.join(':')
}

export function isEmail(email: unknown): email is boolean {
  if (EMAIL_REGEX.test(email as string)) {
    return true
  }

  return false
}

export function isUuid(input: unknown): boolean {
  return typeof input === 'string' && UUID_REGEX.test(input)
}

export function normalizePhonePrefix(prefix: string | undefined) {
  return prefix?.startsWith('+') ? prefix : `+${prefix}`
}

export function safeParseJson<T = Record<string, unknown>>(
  jsonString: unknown
): T | null {
  if (typeof jsonString !== 'string') {
    return null
  }

  try {
    return JSON.parse(jsonString)
  } catch {
    return null
  }
}

export function isValidHttpUrl(str: string) {
  let url

  try {
    url = new URL(str)
  } catch (_) {
    return false
  }

  return url.protocol === 'http:' || url.protocol === 'https:'
}
