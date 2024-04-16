import { ComponentType } from "react"
import { Controller } from "react-hook-form"
import { useFormError } from "../Controlled/useFormError"
import { InputFieldProps } from "./Input/InputField"
import { SelectFieldProps } from "./Select/SelectField"
import { Validation } from "./types"

type ControllerProps = {
  validation: Validation
}

export function withController(WrappedComponent: ComponentType<InputFieldProps | SelectFieldProps>) {
  function Component(props: (SelectFieldProps | InputFieldProps) & ControllerProps) {
    const { validation, name } = props
    const rules = validation?.rules
    const error = useFormError(name)

    return (
      <Controller
        name={props.name}
        rules={rules}
        render={({ field }) => {
          const mergedProps = { ...props, ...field, error }
          return <WrappedComponent {...mergedProps} />
        }}
      />
    )
  }

  return Component
}
