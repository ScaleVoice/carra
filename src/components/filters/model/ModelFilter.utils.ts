import { useLovMakesSearchQuery } from 'core/api/lov/lovMakesSearch'
import { useModelList } from 'core/api/lov/lovModelsSearch'
import { useMemo } from 'react'
import { GroupBase } from 'react-select'
import { FilterSelectOption } from '../general/select/FilterSelect.utils'

export function useModelFilterOptions(selectedCarMakeIds?: string[]) {
  const fetchingEnabled = !!selectedCarMakeIds && !!selectedCarMakeIds.length

  const { models } = useModelList(selectedCarMakeIds, fetchingEnabled)

  const { data: makes } = useLovMakesSearchQuery(
    {
      ids: selectedCarMakeIds ?? []
    },
    {
      enabled: fetchingEnabled
    }
  )

  // grouped options for filter select component
  const groupedModelOptions = useMemo(
    () =>
      (makes?.content ?? []).reduce((acc, curr) => {
        return [
          ...acc,
          {
            label: curr.name,
            options: models
              .filter(model => model.makeId === curr.id)
              .map(filteredModel => ({
                value: filteredModel.id,
                label: filteredModel.name ?? filteredModel.id
              }))
          }
        ].sort(sortModelSelectOptions)
      }, [] as GroupBase<FilterSelectOption>[]),
    [makes?.content, models]
  )

  const modelOptions = useMemo(
    () =>
      models.map(model => ({
        value: model.id,
        label: model.name ?? model.id
      })),
    [models]
  )

  return { groupedModelOptions, modelOptions }
}

function sortModelSelectOptions(
  a: GroupBase<FilterSelectOption>,
  b: GroupBase<FilterSelectOption>
) {
  if (!a.label || !b.label) {
    return 0
  }

  return a.label.localeCompare(b.label)
}
