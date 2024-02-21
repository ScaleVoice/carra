import { ReactNode } from 'react'
import { useController } from 'react-hook-form'
import { useValidationMessage } from 'utils/validations'
import { SelectUncontrolled } from './SelectUncontrolled'

export type SelectProps = {
  label?: string
  emptyLabel?: string
  name: string
  options: { value: string; label: string }[]
  isLoading?: boolean
  isRequired?: boolean
  onFocus?: () => void
  onBlur?: () => void
  onChange?: (newValue: string) => void
  error?: ReactNode
  disabled?: boolean
  readOnly?: boolean
  extraOptions?: { value: string; label: string }[]
  variant?: 'rounded' | 'normal'
  disabledMode?: 'solid'
  hint?: ReactNode
  className?: string
}

export function Select(props: SelectProps) {
  const {
    field: { value, onChange }
  } = useController({ name: props.name })

  const validationError = useValidationMessage(props.name)

  return (
    <SelectUncontrolled
      {...props}
      error={props.error ?? validationError}
      onInnerChange={onChange}
      value={value}
    />
  )
}
