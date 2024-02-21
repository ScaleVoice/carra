import { RangeFilter } from '../general/rangeFilter/RangeFilter'

interface Props {
  label: string
  profitFrom?: number | null
  profitTo?: number | null
  onProfitChange: (from?: number | null, to?: number | null) => void
}

const minRank = 0
const maxRank = undefined

export function ProfitFilter({
  label,
  profitFrom = null,
  profitTo = null,
  onProfitChange
}: Props) {
  return (
    <RangeFilter
      title={label}
      min={minRank}
      max={maxRank}
      name="profit"
      fromValue={profitFrom}
      toValue={profitTo}
      onApply={onProfitChange}
    />
  )
}
