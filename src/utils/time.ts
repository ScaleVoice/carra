import { differenceInSeconds } from 'date-fns'

// https://stackoverflow.com/a/28037042/10912244
export function roundToHour(date: Date) {
  const p = 60 * 60 * 1000 // milliseconds in an hour
  return new Date(Math.round(date.getTime() / p) * p)
}

export function getRemainingTime(plannedEndAt: string) {
  const currentDate = new Date()
  return differenceInSeconds(currentDate, new Date(plannedEndAt))
}

export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
