import { RangeFilter } from '../general/rangeFilter/RangeFilter'

interface Props {
  label: string
  yearFrom?: number | null
  yearTo?: number | null
  onYearChange: (from?: number | null, to?: number | null) => void
}

const defaultMinYear = 1900
const defaultMaxYear = new Date().getFullYear()

export function YearFilter({
  label,
  yearFrom = null,
  yearTo = null,
  onYearChange
}: Props) {
  return (
    <RangeFilter
      title={label}
      min={defaultMinYear}
      max={defaultMaxYear}
      name="year"
      fromValue={yearFrom}
      toValue={yearTo}
      onApply={onYearChange}
    />
  )
}
