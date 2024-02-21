import {
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  isAfter
} from 'date-fns'
import { padWithZeros } from 'utils/strings'

export function createTimerString(reservationDate: Date): string {
  const currentDate = new Date()
  if (isAfter(currentDate, reservationDate)) {
    return '00:00:00'
  }

  const hours = differenceInHours(reservationDate, currentDate)
  const hoursInMinutes = hours * 60
  const hoursInSeconds = hoursInMinutes * 60

  const minutes =
    differenceInMinutes(reservationDate, currentDate) - hoursInMinutes
  const minutesInSeconds = minutes * 60

  const seconds =
    differenceInSeconds(reservationDate, currentDate) -
    minutesInSeconds -
    hoursInSeconds

  const paddedHours = padWithZeros(hours, 2)
  const paddedMinutes = padWithZeros(minutes, 2)
  const paddedSeconds = padWithZeros(seconds, 2)
  return [paddedHours, paddedMinutes, paddedSeconds].join(':')
}
