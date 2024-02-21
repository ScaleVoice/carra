import { FormControl } from 'components/form/formControl/FormControl'
import { useRouter } from 'next/router'
import { ComponentProps, useEffect, useRef, useState } from 'react'
import { clamp } from 'utils/math'
import { parseNum } from 'utils/parsing'
import { isNotNil } from 'utils/types'
import { SCurrency, SFormControl } from './InputNumber.styled'
import { NUMBER_INPUT_REGEXP } from './InputNumber.utils'

export type Props = ComponentProps<typeof FormControl> & {
  name: string
  value: number | null
  onChange: (value: number | null) => void
  onBlur?: (value: number | null) => void
  onKeyUp?: () => void
  error?: string
  min?: number
  max?: number
  currency?: string
  currencyPosition?: 'right' | 'left'
  formatter?: (value: number | null, locale?: string) => string | number
  ariaLabel?: string
  className?: string
  step?: number
  inputDisabled?: boolean
}

export function InputNumberNullable(props: Props) {
  const {
    name,
    value,
    onChange,
    error,
    min,
    max,
    currency,
    currencyPosition = 'left',
    ariaLabel,
    onKeyUp,
    step,
    formatter,
    onBlur,
    inputDisabled,
    ...formControlProps
  } = props

  const { locale } = useRouter()

  const inputRef = useRef<HTMLInputElement>(null)
  const [inputValue, setInputValue] = useState<number | string>(value ?? '')

  const getNumericValue = (input: string) => {
    // replaces all empty characters from input
    const sanitizedInput = input.replace(/\s/g, '')
    const parsedValue = parseNum(sanitizedInput, locale)
    return isNaN(parsedValue) ? 0 : parsedValue
  }

  const handleChange = (input: string) => {
    if (input.match(NUMBER_INPUT_REGEXP)) {
      setInputValue(input)
    }
  }

  const handleBlur = (input: string) => {
    const clampedValue =
      input === ''
        ? null
        : clamp(getNumericValue(input), min ?? -Infinity, max ?? Infinity)

    const inputValue = formatter
      ? formatter(clampedValue, locale)
      : clampedValue

    onChange(clampedValue)
    setInputValue(inputValue ?? '')
    onBlur?.(clampedValue)
  }

  const handleKeypress = (key: string) => {
    if (key === 'Enter') {
      inputRef.current?.blur()
    }
  }

  // sync inputValue with actual real value when value changes
  useEffect(() => {
    if (isNotNil(value)) {
      handleChange((formatter ? formatter(value, locale) : value).toString())
    } else {
      handleChange('')
    }
  }, [value, formatter, locale, name])

  return (
    <SFormControl
      currencyPosition={currencyPosition}
      hasCurrency={!!currency}
      hasLabel={!!formControlProps.label}
      {...formControlProps}
      error={error}
    >
      <input
        ref={inputRef}
        name={name}
        value={inputValue ?? ''}
        min={min}
        max={max}
        step={step}
        aria-label={ariaLabel}
        onChange={e => handleChange(e.target.value)}
        onBlur={e => handleBlur(e.target.value)}
        onKeyDown={e => handleKeypress(e.key)}
        onKeyUp={onKeyUp}
        className={props.className}
        disabled={inputDisabled}
      />
      {currency && <SCurrency align={currencyPosition}>{currency}</SCurrency>}
    </SFormControl>
  )
}
