import { Control, FieldValues, get, useFormState } from 'react-hook-form'

export function useValidationMessage<T extends FieldValues>(
  name: keyof T,
  control?: Control<T>
) {
  const { errors } = useFormState<T>({ control })
  const message = get(errors, `${name.toString()}.message`) || undefined

  if (Array.isArray(message)) {
    return message
      .map(i => i.message)
      .filter(Boolean)
      .join()
  }

  if (message) {
    return message
  }

  return undefined
}
