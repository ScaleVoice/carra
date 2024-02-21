import { size } from 'core/styles/spacing'
import { color, font, radius } from 'core/styles/variables'
import {
  GroupBase,
  MultiValue,
  OnChangeValue,
  SelectComponentsConfig,
  SingleValue,
  StylesConfig
} from 'react-select'

export interface FilterSelectOption {
  value: string
  label: string
}

export type SingleSelectOnChangeHandler = (
  newValue: SingleValue<FilterSelectOption>
) => void

export type MultiSelectOnChangeHandler = (
  newValue: MultiValue<FilterSelectOption>
) => void

export type SelectOnChangeValue<
  T extends FilterSelectOption,
  Multi extends boolean
> = OnChangeValue<T, Multi>

export type SingleSelectOnChangeValue<T extends FilterSelectOption> =
  SelectOnChangeValue<T, false>

export type MultiSelectOnChangeValue<T extends FilterSelectOption> =
  SelectOnChangeValue<T, true>

export interface CommonSelectProps<T extends FilterSelectOption> {
  id: string
  label: string
  options: T[] | GroupBase<T>[]
  clearable?: boolean
  disabled?: boolean
  isLoading?: boolean
}

export interface SingleSelectProps<T extends FilterSelectOption>
  extends CommonSelectProps<T> {
  multiSelect?: false
  value: SingleValue<T>
  onChange: (newValue: SingleSelectOnChangeValue<T>) => void
  components?: Partial<SelectComponentsConfig<T, false, GroupBase<T>>>
  styles?: StylesConfig<T, false, GroupBase<T>>
}

export interface MultiValueSelectProps<T extends FilterSelectOption>
  extends CommonSelectProps<T> {
  multiSelect: true
  value: MultiValue<T>
  onChange: (newValue: MultiSelectOnChangeValue<T>) => void
  components?: Partial<SelectComponentsConfig<T, true, GroupBase<T>>>
  styles?: StylesConfig<T, true, GroupBase<T>>
}

export const generalSelectStyles: StylesConfig<any, boolean, GroupBase<any>> = {
  container: (provided, { isDisabled }) => ({
    ...provided,
    position: 'relative',
    flex: 1,
    boxSizing: 'border-box',
    '&:focus-within svg': {
      transform: 'rotate(180deg)'
    },
    padding: '0px 14px',
    border: `2px solid ${color('night-l-700')}`,
    opacity: isDisabled ? 0.4 : 1
  }),
  control: () => ({
    display: 'flex',
    flex: 1,
    fontFamily: font('heading'),
    color: 'red'
  }),
  input: provided => ({
    ...provided,
    padding: 0
  }),
  multiValueLabel: provided => ({
    ...provided,
    borderRadius: '2px 0 0 2px',
    backgroundColor: color('night-l-700'),
    color: color('night-l-100')
  }),
  multiValueRemove: provided => ({
    ...provided,
    borderRadius: '0 2px 2px 0',
    cursor: 'pointer',
    backgroundColor: color('night-l-700')
  }),
  groupHeading: provided => ({
    ...provided,
    color: color('night-l-100'),
    fontSize: 14,
    fontWeight: 700
  }),
  indicatorSeparator: () => ({ display: 'none' }),
  valueContainer: provided => ({
    ...provided,
    padding: '14px 0',
    cursor: 'pointer'
  }),
  singleValue: provided => ({
    ...provided,
    marginLeft: 0,
    marginRight: 0
  }),
  multiValue: provided => ({
    ...provided,
    maxWidth: size(40),
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis'
  }),
  menu: provided => {
    return {
      ...provided,
      right: 0,
      zIndex: 999,
      scrollbarWidth: 'thin',
      scrollbarColor: `${color('almond')} ${color('almond-l-200')}`,
      '&::-webkit-scrollbar-track': {
        background: color('almond-l-200')
      },
      '&::-webkit-scrollbar': {
        width: 6,
        height: 6
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: color('almond'),
        borderRadius: radius('full')
      }
    }
  },
  menuList: provided => ({
    ...provided,
    scrollbarWidth: 'thin',
    scrollbarColor: `${color('almond')} ${color('almond-l-200')}`,
    '::-webkit-scrollbar-track': {
      background: color('almond-l-200')
    },
    '::-webkit-scrollbar': {
      width: 6,
      height: 6
    },
    '::-webkit-scrollbar-thumb': {
      backgroundColor: color('almond'),
      borderRadius: radius('full')
    }
  }),
  option: (provided, { isDisabled, isFocused, isSelected }) => {
    return {
      ...provided,
      backgroundColor: isSelected
        ? color('night-l-100')
        : isFocused
        ? color('night-l-700')
        : undefined,
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      ':active': {
        ...provided[':active'],
        backgroundColor: !isDisabled ? color('night-l-700') : undefined
      }
    }
  },
  placeholder: provided => ({
    ...provided,
    margin: 0,
    fontWeight: 500,
    color: color('night-text')
  }),
  dropdownIndicator: provided => ({
    ...provided,
    padding: 0,
    color: color('night-l-100')
  }),
  clearIndicator: provided => ({
    ...provided,
    padding: 4,
    color: color('night-l-100')
  })
}
