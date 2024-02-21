import { useController } from 'react-hook-form'
import { InputSearch } from './InputSearch'

type Props = {
  name: string
  placeholder: string
  onSubmit?: () => void
  label?: string
  onChange?: () => void
  isLoading?: boolean
  className?: string
  submitButtonType?: 'submit' | 'button'
}

export function InputSearchControlled(props: Props) {
  const { name, isLoading, onChange: onChangeProp, ...rest } = props

  const {
    field: { value, onChange }
  } = useController({ name })

  return (
    <InputSearch
      value={value}
      onChange={(...event) => {
        onChange(...event)
        onChangeProp?.()
      }}
      name={name}
      {...rest}
    />
  )
}
