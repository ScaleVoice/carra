import { FilterMultiSelect } from './FilterMultiSelect'
import {
  CommonSelectProps,
  FilterSelectOption,
  MultiValueSelectProps,
  SingleSelectProps,
  generalSelectStyles
} from './FilterSelect.utils'
import { FilterSingleSelect } from './FilterSingleSelect'

type Props<T extends FilterSelectOption> = CommonSelectProps<T> &
  (SingleSelectProps<T> | MultiValueSelectProps<T>)

export function FilterSelect<T extends FilterSelectOption>(props: Props<T>) {
  if (props.multiSelect) {
    return <FilterMultiSelect {...props} styles={generalSelectStyles} />
  }

  return <FilterSingleSelect {...props} styles={generalSelectStyles} />
}
