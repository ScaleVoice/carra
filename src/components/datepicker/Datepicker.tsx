import { format, isValid } from 'date-fns'
import React, { forwardRef, useEffect, useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { isNil } from 'utils/types'
import { SDateInput } from './Datepicker.styled'

interface DatePickerProps {
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

const dateTimeFormat = 'dd.MM.yyyy HH:mm'
const dateFormat = 'dd.MM.yyyy'

export function DatePicker({
  value,
  onChange,
  minDate,
  maxDate,
  showTimeInput = false,
  isClearable = true,
  placeholder,
  showArrow = false
}: DatePickerProps) {
  const [datePickerValue, setDatePickerValue] = useState<
    string | null | undefined
  >(value && isValid(new Date(value)) ? value : null)

  // formatting of what user sees in input
  const inputValueFormat = showTimeInput ? dateTimeFormat : dateFormat
  // formatting of value actually used (sending to BE and stuff)
  const valueFormat = showTimeInput ? 'yyyy-MM-dd HH:mm' : 'yyyy-MM-dd'

  const handleDatePickerChange = (newDate: Date | null) => {
    if (isNil(newDate)) {
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

    if (isNil(value)) {
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
      customInput={<DatePickerInput />}
      clearButtonClassName="ticking-datepicker-clear-btn"
      placeholderText={placeholder}
    />
  )
}

const DatePickerInput = forwardRef<
  HTMLInputElement,
  React.HTMLProps<HTMLInputElement>
>((props, ref) => {
  return <SDateInput {...props} ref={ref} as="input" />
})
