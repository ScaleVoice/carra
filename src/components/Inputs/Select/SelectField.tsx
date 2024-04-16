import { forwardRef } from "react"
import { Field, FieldProps } from "../Field"
import { Select, SelectProps } from "./Select"

export type SelectFieldProps = FieldProps &
  Omit<SelectProps, "ref" | "error"> & {
    fieldClassName?: string
  }

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ id, name, fieldClassName = "", label, renderLabel, hint, renderHint, error, renderError, tooltip, ...rest }) => {
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
        <Select id={id ?? name} name={name} error={Boolean(error)} {...rest} />
      </Field>
    )
  },
)

SelectField.displayName = "SelectField"
