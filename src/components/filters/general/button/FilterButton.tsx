import { TextBody } from 'components/text/Text'
import IconChevronDown from 'core/images/icons/IconChevronDown.svg'
import IconSliders from 'core/images/icons/IconSliders.svg'
import { ReactNode } from 'react'
import {
  SContainer,
  SFiltersButtonIcon,
  SLabel,
  SLabels
} from './FilterButton.styled'

interface Props {
  label?: string
  icon?: ReactNode
  isSelected?: boolean
  selectedText?: string
  isActive?: boolean
  onClick?: () => void
  disabled?: boolean
}

export function FiltersButton({
  label,
  icon,
  isSelected,
  selectedText,
  isActive,
  onClick,
  disabled
}: Props) {
  return (
    <SContainer
      isActive={isActive}
      isSelected={isSelected}
      onClick={onClick}
      disabled={disabled}
    >
      {icon || (
        <>
          <SLabels>
            <SLabel size={['small', 'large']} isSelected={isSelected}>
              {label}
            </SLabel>
            <TextBody variant="setup" size={['small', 'large']}>
              {isSelected && selectedText}
            </TextBody>
          </SLabels>
          <SFiltersButtonIcon as={isSelected ? IconSliders : IconChevronDown} />
        </>
      )}
    </SContainer>
  )
}
