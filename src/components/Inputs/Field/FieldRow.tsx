import { twMerge } from "tailwind-merge"
import { LabelTextVariantProps, labelAlignmentVariants, labelTextVariants } from "../labelVariants"
import { DefaultFieldLabel, FieldProps, UnderText } from "./Field"

type FieldRowProps = FieldProps & LabelTextVariantProps

export const FieldRow = ({
  id,
  name,
  label,
  renderLabel,
  error,
  renderError,
  hint,
  renderHint,
  children,
  className,
  tooltip,
  size,
}: FieldRowProps) => {
  const labelAlignment = labelAlignmentVariants({ size })
  const labelClassName = twMerge(
    "relative my-1 flex  cursor-pointer select-text items-start rounded-lg",
    labelTextVariants({ size }),
    labelAlignment,
    className,
  )

  return (
    <label htmlFor={id ?? name} className={twMerge("flex w-full flex-row gap-2 text-gray", labelClassName)}>
      {children}

      <div className="flex flex-col items-start">
        {(label || renderLabel) && (
          <>
            {renderLabel ? <>{renderLabel(labelAlignment)}</> : <DefaultFieldLabel label={label} tooltip={tooltip} />}
          </>
        )}

        <UnderText error={error} hint={hint} renderError={renderError} renderHint={renderHint} />
      </div>
    </label>
  )
}
