import Select from 'react-select'
import { FilterSelectOption, MultiValueSelectProps } from './FilterSelect.utils'

export function FilterMultiSelect<T extends FilterSelectOption>(
  props: MultiValueSelectProps<T>
) {
  return (
    <Select
      {...props}
      instanceId={props.id}
      isMulti
      isDisabled={props.disabled}
      placeholder={props.label}
      closeMenuOnSelect={false}
    />
  )
}
