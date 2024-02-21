import { ErrorMessage } from 'components/errorMessage/ErrorMessage'
import { LetterIcon } from 'components/letterIcon/LetterIcon'
import { Spacer } from 'components/spacer/Spacer'
import { TextBody } from 'components/text/Text'
import IconSelectedOption from 'core/images/icons/IconSelectedOption.svg'
import { color } from 'core/styles/variables'
import { ReactNode } from 'react'
import { SOption, SOptions } from './InputSwitch.styled'

interface Option<T> {
  value: T
  label: string
  testId?: string
}

type InputSwitchProps<T> = {
  options: Option<T>[]
  value: T
  onChange: (val: T) => void
  error?: ReactNode
  useLetterIcon?: boolean
}

export function InputSwitch<T>(props: InputSwitchProps<T>) {
  const { onChange, value, error, useLetterIcon } = props

  return (
    <>
      <SOptions columns={props.options.length}>
        {props.options.map((option, i) => (
          <SOption
            key={i}
            selected={value === option.value}
            onClick={() => onChange(props.options[i].value)}
            data-testid={props.options[i].testId}
            aria-label={`hybrid - ${props.options[i].label}`}
          >
            {useLetterIcon && (
              <LetterIcon selected={value === option.value}>
                {props.options[i].label.charAt(0).toUpperCase()}
              </LetterIcon>
            )}
            <TextBody>{props.options[i].label}</TextBody>
            {props.options[i].value === value && (
              <IconSelectedOption color={color('night-l-200')} />
            )}
          </SOption>
        ))}
      </SOptions>

      {error && (
        <>
          <Spacer axis="vertical" size={2} />

          {typeof error === 'string' ? (
            <ErrorMessage>{error}</ErrorMessage>
          ) : (
            error
          )}
        </>
      )}
    </>
  )
}
