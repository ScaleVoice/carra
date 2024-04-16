import { useFormContext } from "react-hook-form"

export function useFormError(name: string) {
  const context = useFormContext()
  const error = context?.formState.errors[name]
  const message = error?.message as string

  return message || ""
}
