import { ComponentProps } from 'react'
import { useController } from 'react-hook-form'
import { useValidationMessage } from 'utils/validations'
import { InputNumberNullable } from './InputNumberNullable'

type Props = Omit<
  ComponentProps<typeof InputNumberNullable>,
  'value' | 'onChange' | 'error'
> & { defaultValue?: number }

export function InputNumberNullableControlled(props: Props) {
  const {
    field: { value, onChange }
  } = useController({ name: props.name, defaultValue: props.defaultValue })
  const error = useValidationMessage(props.name)

  return (
    <InputNumberNullable
      value={value}
      onChange={onChange}
      error={error}
      {...props}
    />
  )
}
