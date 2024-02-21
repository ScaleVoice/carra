import Select from 'react-select'
import { FilterSelectOption, SingleSelectProps } from './FilterSelect.utils'

export function FilterSingleSelect<T extends FilterSelectOption>(
  props: SingleSelectProps<T>
) {
  return (
    <Select
      {...props}
      instanceId={props.id}
      isMulti={false}
      isDisabled={props.disabled}
      placeholder={props.label}
      closeMenuOnSelect
    />
  )
}
