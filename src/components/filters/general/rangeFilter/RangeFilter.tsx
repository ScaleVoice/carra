import { Flex } from 'components/Flex'
import {
  InputNumberNullable,
  Props as InputNumberNullableProps
} from 'components/inputNumber/InputNumberNullable'
import { TextBody } from 'components/text/Text'
import { useTranslation } from 'next-i18next'
import { useCallback, useEffect, useState } from 'react'
import { isNil } from 'utils/types'

interface Props
  extends Pick<
    InputNumberNullableProps,
    'currency' | 'currencyPosition' | 'max' | 'min'
  > {
  title: string
  name: string
  labelFrom?: string
  labelTo?: string
  fromValue?: number | null
  toValue?: number | null
  onApply: (from?: number | null, to?: number | null) => void
}

export function RangeFilter({
  title,
  fromValue = null,
  toValue = null,
  name,
  labelFrom,
  labelTo,
  onApply,
  min,
  max,
  ...rest
}: Props) {
  const { t } = useTranslation()
  const [from, setFrom] = useState(fromValue)
  const [to, setTo] = useState(toValue)

  const handleBlurFrom = useCallback(
    (newFrom: number | null) => {
      onApply(newFrom, to)
    },
    [onApply, to]
  )

  const handleBlurTo = useCallback(
    (newTo: number | null) => {
      onApply(from, newTo)
    },
    [onApply, from]
  )

  // we also need to sync those values with states, because if we dont we wont be able to reset those fields externally
  // todo maybe rework range filters later on
  useEffect(() => {
    if (isNil(fromValue)) {
      setFrom(null)
    }

    if (isNil(toValue)) {
      setTo(null)
    }
  }, [fromValue, toValue])

  return (
    <Flex variant="column" gap={1}>
      <TextBody>{title}</TextBody>

      <Flex variant="row" align="center" gap={4}>
        <InputNumberNullable
          label={labelFrom ?? t('from')}
          name={`${name}.from`}
          value={from}
          onChange={setFrom}
          onBlur={handleBlurFrom}
          min={min}
          max={to ? to : max}
          {...rest}
        />
        <InputNumberNullable
          label={labelTo ?? t('to')}
          name={`${name}.to`}
          value={to}
          onChange={setTo}
          onBlur={handleBlurTo}
          min={from ? from : min}
          max={max}
          {...rest}
        />
      </Flex>
    </Flex>
  )
}
