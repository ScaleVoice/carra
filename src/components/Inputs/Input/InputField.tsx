import { forwardRef } from "react"
import { Field, FieldProps } from "../Field"
import { Input, InputProps } from "./Input"

export type InputFieldProps = FieldProps &
  Omit<InputProps, "ref" | "error"> & {
    fieldClassName?: string
  }

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      id,
      name,
      className = "",
      fieldClassName = "",
      label,
      renderLabel,
      hint,
      renderHint,
      error,
      renderError,
      tooltip,
      ...rest
    },
    ref,
  ) => {
    return (
      <Field
        id={id ?? name}
        name={name}
        className={fieldClassName}
        label={label}
        renderLabel={renderLabel}
        error={error}
        renderError={renderError}
        hint={hint}
        renderHint={renderHint}
        tooltip={tooltip}
      >
        <Input id={id ?? name} ref={ref} name={name} className={className} error={Boolean(error)} {...rest} />
      </Field>
    )
  },
)

InputField.displayName = "InputField"
