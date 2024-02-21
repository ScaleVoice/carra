import { useBodiesSearchList } from 'core/api/lov/lovBodiesSearch'
import { useMemo } from 'react'
import { FilterSelect } from '../general/select/FilterSelect'

interface Props {
  label: string
  selectedMakeIds?: string[]
  selectedModelIds?: string[]
  selectedBodyIds?: string[]
  onBodyChange: (bodyIds: string[]) => void
}

export function BodyTypeFilter({
  selectedBodyIds,
  onBodyChange,
  label,
  selectedMakeIds,
  selectedModelIds
}: Props) {
  const { bodies } = useBodiesSearchList(selectedModelIds, selectedMakeIds)

  const value = useMemo(
    () => bodies.filter(({ value }) => selectedBodyIds?.includes(value)),
    [selectedBodyIds, bodies]
  )

  return (
    <>
      <FilterSelect
        id="bodyIds"
        label={label}
        multiSelect
        options={bodies}
        value={value}
        onChange={newValue => {
          onBodyChange(newValue.map(({ value }) => value))
        }}
      />
    </>
  )
}
