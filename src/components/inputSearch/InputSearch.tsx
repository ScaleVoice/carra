import { Flex } from 'components/Flex'
import { TextBody } from 'components/text/Text'
import IconCross from 'core/images/icons/IconCross.svg'
import IconSearch from 'core/images/icons/IconSearch.svg'
import {
  SButton,
  SButtonClear,
  SContainer,
  SInput,
  SInputContainer,
  SSpinner
} from './InputSearch.styled'

type Props = {
  value: string
  onChange: (val: string) => void
  placeholder?: string
  onSubmit?: () => void
  onClear?: () => void
  label?: string
  isLoading?: boolean
  className?: string
  name?: string
  submitButtonType?: 'submit' | 'button'
  submitButtonVariant?: 'primary' | 'secondary'
  noOutline?: boolean
  noSubmitButton?: boolean
  showPlaceholderIcon?: boolean
  onFocus?: () => void
  onBlur?: () => void
}

export function InputSearch({
  value,
  onChange,
  placeholder,
  onSubmit,
  onClear,
  label,
  isLoading,
  className,
  name,
  submitButtonType = 'submit',
  submitButtonVariant = 'secondary',
  noSubmitButton = false,
  noOutline = false,
  showPlaceholderIcon = false,
  onFocus,
  onBlur
}: Props) {
  return (
    <SContainer
      className={className}
      noOutline={noOutline}
      showPlaceholderIcon={showPlaceholderIcon}
    >
      <Flex variant="row" align="center" gap={2}>
        {showPlaceholderIcon && <IconSearch />}
        <SInputContainer>
          <TextBody size="small">{label}</TextBody>
          <SInput
            noLabel={!label}
            placeholder={placeholder}
            onChange={({ target }) => onChange(target.value)}
            value={value}
            onKeyPress={e => e.key === 'Enter' && onSubmit?.()}
            name={name}
            onFocus={onFocus}
            onBlur={onBlur}
          />
        </SInputContainer>
      </Flex>
      <Flex variant="row" gap={2}>
        {!!value && (
          <SButtonClear
            variant="outline"
            type="button"
            onClick={() => {
              onClear?.()
              onChange('')
            }}
          >
            <IconCross />
          </SButtonClear>
        )}
        {!noSubmitButton && (
          <SButton
            variant={submitButtonVariant}
            type={submitButtonType}
            onClick={onSubmit}
            disabled={isLoading}
          >
            {isLoading ? <SSpinner variant="small" /> : <IconSearch />}
          </SButton>
        )}
      </Flex>
    </SContainer>
  )
}
