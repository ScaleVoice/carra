import { InputNumber } from 'components/inputNumber/InputNumber'
import { ComponentProps } from 'react'
import { useController } from 'react-hook-form'
import { useValidationMessage } from 'utils/validations'

type Props = Omit<
  ComponentProps<typeof InputNumber>,
  'value' | 'onChange' | 'error'
> & { defaultValue?: number }

export function InputNumberControlled(props: Props) {
  const {
    field: { value, onChange }
  } = useController({ name: props.name, defaultValue: props.defaultValue })
  const error = useValidationMessage(props.name)

  return (
    <InputNumber value={value} onChange={onChange} error={error} {...props} />
  )
}
