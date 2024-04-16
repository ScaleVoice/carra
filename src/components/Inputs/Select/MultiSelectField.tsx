import { ReactElement, Ref, forwardRef } from "react"
import { Field, FieldProps } from "../Field"
import { Option } from "../types"
import { MultiSelect, MultiSelectProps } from "./MultiSelect"

export type MultiSelectFieldProps<O extends Option> = FieldProps &
  Omit<MultiSelectProps<O>, "ref" | "error"> & {
    fieldClassName?: string
  }

function BaseMultiSelectFieldComponent<O extends Option>({
  id,
  name,
  fieldClassName = "",
  label,
  renderLabel,
  hint,
  renderHint,
  error,
  renderError,
  tooltip,
  ...rest
}: MultiSelectFieldProps<O>) {
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
      <MultiSelect id={id ?? name} name={name} error={Boolean(error)} {...rest} />
    </Field>
  )
}

export const BaseMultiSelectField = forwardRef(BaseMultiSelectFieldComponent) as <O extends Option>(
  p: MultiSelectFieldProps<O> & { ref?: Ref<HTMLSelectElement> },
) => ReactElement
