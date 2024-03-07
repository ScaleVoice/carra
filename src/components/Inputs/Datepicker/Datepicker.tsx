import { format, isValid } from "date-fns"
import { forwardRef, useEffect, useState } from "react"
import ReactDatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { Input, InputProps } from "../Input"

interface DatePickerProps {
  name: string
  value: string | null
  tooltip?: string | null
  onChange: (value: string | null) => void
  minDate?: Date | null
  maxDate?: Date | null
  showTimeInput?: boolean
  isClearable?: boolean
  placeholder?: string
  showArrow?: boolean
}

const dateTimeFormat = "dd.MM.yyyy HH:mm"
const dateFormat = "dd.MM.yyyy"

export function DatePicker({
  name,
  value,
  onChange,
  minDate,
  maxDate,
  showTimeInput = false,
  isClearable = true,
  placeholder,
  showArrow = false,
}: DatePickerProps) {
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
      popperPlacement="left-start"
      showPopperArrow={showArrow}
      dateFormat={inputValueFormat}
      strictParsing={true}
      selected={datePickerValue ? new Date(datePickerValue) : null}
      onChange={handleDatePickerChange}
      calendarStartDay={1}
      calendarClassName="ticking-datepicker"
      minDate={minDate}
      maxDate={maxDate}
      showTimeInput={showTimeInput}
      isClearable={isClearable}
      customInput={<DatePickerInput name={name} />}
      clearButtonClassName="ticking-datepicker-clear-btn"
      placeholderText={placeholder}
    />
  )
}

const DatePickerInput = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return <Input {...props} ref={ref} />
})

DatePickerInput.displayName = "DatePickerInput"
