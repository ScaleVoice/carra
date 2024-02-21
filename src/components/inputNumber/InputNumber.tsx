import { FormControl } from 'components/form/formControl/FormControl'
import { useRouter } from 'next/router'
import {
  ComponentProps,
  KeyboardEvent,
  useEffect,
  useRef,
  useState
} from 'react'
import { clamp } from 'utils/math'
import { parseNum } from 'utils/parsing'
import { isNotNil } from 'utils/types'
import { SCurrency, SFormControl } from './InputNumber.styled'
import { NUMBER_INPUT_REGEXP } from './InputNumber.utils'

export type Props = ComponentProps<typeof FormControl> & {
  name: string
  value: number
  onChange: (value: number) => void
  onBlur?: (value: number) => void
  onKeyUp?: () => void
  error?: string
  min?: number
  max?: number
  currency?: string
  currencyPosition?: 'right' | 'left'
  ariaLabel?: string
  className?: string
  formatter?: (value: number, locale?: string) => string | number
  step?: number
  inputDisabled?: boolean
}

export function InputNumber(props: Props) {
  const {
    name,
    value,
    onChange,
    error,
    min,
    max,
    currency,
    ariaLabel,
    onKeyUp,
    step,
    onBlur,
    formatter,
    currencyPosition = 'left',
    inputDisabled,
    ...formControlProps
  } = props

  const { locale } = useRouter()

  const inputRef = useRef<HTMLInputElement>(null)
  const [inputValue, setInputValue] = useState<number | string>(
    props.value ?? ''
  )

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
    const numericValue = getNumericValue(input)

    const clampedValue = clamp(numericValue, min ?? -Infinity, max ?? Infinity)

    const inputValue = formatter
      ? formatter(clampedValue, locale)
      : clampedValue

    onChange(clampedValue)
    setInputValue(inputValue)

    onBlur?.(clampedValue)
  }

  const handleKeypress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      inputRef.current?.blur()
    }
  }

  useEffect(() => {
    if (isNotNil(value)) {
      handleChange((formatter ? formatter(value, locale) : value).toString())
    }
  }, [value, formatter, locale])

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
        onKeyPress={handleKeypress}
        onKeyUp={onKeyUp}
        className={props.className}
        disabled={inputDisabled}
      />
      {currency && <SCurrency align={currencyPosition}>{currency}</SCurrency>}
    </SFormControl>
  )
}
