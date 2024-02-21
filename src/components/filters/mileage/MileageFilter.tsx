import { RangeFilter } from '../general/rangeFilter/RangeFilter'

interface Props {
  label: string
  mileageFrom?: number | null
  mileageTo?: number | null
  onMileageChange: (from?: number | null, to?: number | null) => void
}

const defaultMinYear = 0
const defaultMaxYear = 150000

export function MileageFilter({
  label,
  mileageFrom = null,
  mileageTo = null,
  onMileageChange
}: Props) {
  return (
    <RangeFilter
      title={label}
      min={defaultMinYear}
      max={defaultMaxYear}
      name="mileage"
      fromValue={mileageFrom}
      toValue={mileageTo}
      onApply={onMileageChange}
    />
  )
}
