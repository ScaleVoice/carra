import { RangeFilter } from '../general/rangeFilter/RangeFilter'

interface Props {
  label: string
  rankFrom?: number | null
  rankTo?: number | null
  onRankChange: (from?: number | null, to?: number | null) => void
}

const minRank = 0
const maxRank = 100

export function RankFilter({
  label,
  rankFrom = null,
  rankTo = null,
  onRankChange
}: Props) {
  return (
    <RangeFilter
      title={label}
      min={minRank}
      max={maxRank}
      name="rank"
      fromValue={rankFrom}
      toValue={rankTo}
      onApply={onRankChange}
    />
  )
}
