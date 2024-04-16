import { DateTime } from 'luxon'

export const formatDate = (date: Date, format = 'dd LLL yyyy') => {
  return DateTime.fromJSDate(date).toFormat(format, { locale: 'en-US' })
}

export const formatDateRange = (date1: Date, date2: Date, format = 'dd LLL yyyy') => {
  return `${formatDate(date1, format)} - ${formatDate(date2, format)}`
}
