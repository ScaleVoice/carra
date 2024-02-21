import { useMemo } from 'react'
import { FilterSelect } from '../general/select/FilterSelect'
import { useModelFilterOptions } from './ModelFilter.utils'

interface Props {
  label: string
  selectedCarMakeIds?: string[]
  selectedModelIds?: string[]
  onModelsChange: (modelIds: string[]) => void
}

export function ModelFilter({
  label,
  selectedCarMakeIds,
  selectedModelIds,
  onModelsChange
}: Props) {
  const { groupedModelOptions, modelOptions } =
    useModelFilterOptions(selectedCarMakeIds)

  const value = useMemo(
    () => modelOptions.filter(({ value }) => selectedModelIds?.includes(value)),
    [selectedModelIds, modelOptions]
  )

  return (
    <FilterSelect
      id="modelIds"
      multiSelect
      onChange={newValue => {
        onModelsChange(newValue.map(({ value }) => value))
      }}
      options={groupedModelOptions}
      value={value}
      label={label}
      disabled={!selectedCarMakeIds}
    />
  )
}
