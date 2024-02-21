import { Flex } from 'components/Flex'
import { TextBody } from 'components/text/Text'
import { sortMakes, useMakeList } from 'core/api/lov/lovMakes'
import { useMemo } from 'react'
import { OptionProps, components } from 'react-select'
import { FilterSelect } from '../general/select/FilterSelect'
import { SMakeIcon } from './MakeFilter.styled'
import { MakeFilterSelectOption, makeIconsMap } from './MakeFilter.utils'

interface Props {
  label: string
  selectedMakeIds?: string[]
  onMakesChange: (makeIds: string[]) => void
}

export function MakeFilter({ selectedMakeIds, onMakesChange, label }: Props) {
  const { carMakes } = useMakeList()

  const makeOptions = useMemo(() => {
    return carMakes
      .map(make => ({
        icon: makeIconsMap[make.id],
        value: make.id,
        label: make.name ?? make.id
      }))
      .sort(sortMakes)
  }, [carMakes])

  const value = useMemo(
    () => makeOptions.filter(({ value }) => selectedMakeIds?.includes(value)),
    [selectedMakeIds, makeOptions]
  )

  return (
    <FilterSelect
      id="makeIds"
      multiSelect
      onChange={newValue => {
        onMakesChange(newValue.map(({ value }) => value))
      }}
      components={{
        Option: MakeOption
      }}
      options={makeOptions}
      value={value}
      label={label}
    />
  )
}

function MakeOption(props: OptionProps<MakeFilterSelectOption, true>) {
  return (
    <components.Option {...props}>
      <Flex variant="row" gap={3} align="center">
        <SMakeIcon src={props.data.icon} />
        <TextBody>{props.data.label}</TextBody>
      </Flex>
    </components.Option>
  )
}
