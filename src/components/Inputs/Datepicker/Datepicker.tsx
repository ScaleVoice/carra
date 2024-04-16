import { format, isValid } from "date-fns"
import { forwardRef, useEffect, useState } from "react"
import ReactDatePicker, { ReactDatePickerProps } from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { Input, InputProps } from "../Input/Input"

type DatePickerProps = {
  name: string
  value: string | null
  onChange: (value: string | null) => void
  placeholder?: string
} & Omit<ReactDatePickerProps, 'value' | 'onChange'>

const dateTimeFormat = "dd.MM.yyyy HH:mm"
const dateFormat = "dd.MM.yyyy"

export const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
  ({ name, value, onChange, placeholder, showTimeInput = false, ...props }) => {
    const [datePickerValue, setDatePickerValue] = useState<string | null | undefined>(
      value && isValid(new Date(value)) ? value : null,
    )

    // formatting of what user sees in input
    const inputValueFormat = showTimeInput ? dateTimeFormat : dateFormat
    // formatting of value actually used (sending to BE and stuff)
    const valueFormat = showTimeInput ? "yyyy-MM-dd HH:mm" : "yyyy-MM-dd"

    const handleDatePickerChange = (newDate: Date | null) => {
      if (!newDate) {
        onChange(null)
        setDatePickerValue(null)

        return
      }

      onChange(format(newDate, valueFormat))
      setDatePickerValue(format(newDate, valueFormat))
    }

    // sync values
    useEffect(() => {
      if (value && isValid(new Date(value)) && value !== datePickerValue) {
        setDatePickerValue(value)
      }

      if (!value) {
        setDatePickerValue(null)
      }
    }, [value, datePickerValue])

    return (
      <ReactDatePicker
        dateFormat={inputValueFormat}
        strictParsing={true}
        selected={datePickerValue ? new Date(datePickerValue) : null}
        onChange={handleDatePickerChange}
        calendarStartDay={1}
        calendarClassName="ticking-datepicker"
        showTimeInput={showTimeInput}
        customInput={<DatePickerInput name={name} placeholder={placeholder} />}
        clearButtonClassName="ticking-datepicker-clear-btn"
        {...props}
      />
    )
  },
)

DatePicker.displayName = "DatePicker"

const DatePickerInput = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return <Input {...props} ref={ref} />
})

DatePickerInput.displayName = "DatePickerInput"
