import { forwardRef } from "react"
import { FieldProps, FieldRow } from "../Field"
import { Checkbox, CheckboxProps } from "./Checkbox"
import { twMerge } from "tailwind-merge"

export type CheckboxFieldProps = FieldProps &
  Omit<CheckboxProps, "ref" | "error"> & {
    name: string
    label?: string
    fieldClassName?: string
    inputClassName?: string
    error?: string
  }

export const CheckboxField = forwardRef<HTMLInputElement, CheckboxFieldProps>(
  ({
    id,
    name,
    label,
    renderLabel,
    fieldClassName = "",
    inputClassName = "",
    hint,
    renderHint,
    error,
    renderError,
    size,
    ...rest
  }) => {
    const renderFieldLabel = () => {
      if (renderLabel) {
        return renderLabel
      } else {
        // eslint-disable-next-line react/display-name
        return (className?: FieldProps["className"]) => <DefaultCheckboxLabel label={label} className={className} />
      }
    }

    return (
      <FieldRow
        id={id ?? name}
        name={name}
        label={label}
        renderLabel={renderFieldLabel()}
        error={error}
        renderError={renderError}
        hint={hint}
        renderHint={renderHint}
        className={fieldClassName}
        size={size}
      >
        <Checkbox id={id ?? name} name={name} className={inputClassName} error={Boolean(error)} size={size} {...rest} />
      </FieldRow>
    )
  },
)

CheckboxField.displayName = "CheckboxField"

interface DefaultCheckboxLabelProps {
  label?: string
  className?: string
}

function DefaultCheckboxLabel({ className, label }: DefaultCheckboxLabelProps) {
  return <span className={twMerge('select-none', className)}>{label}</span>
}
