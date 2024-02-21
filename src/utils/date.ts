export function parseUTCDate(input: string): Date {
  const [date, _time] = input.split('T')
  const time =
    _time === null ? '00:00:00Z' : !_time.match(/[-+Z]+/) ? `${_time}Z` : _time
  return new Date(`${date}T${time}`)
}
