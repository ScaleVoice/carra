import { ReactNode, PropsWithChildren } from 'react'
import { SChip, SIconRemove } from './Chip.styled'
import { TextBody } from '../text/Text'
import IconCross from 'core/images/icons/IconCross.svg'

interface Props {
  onClick?: () => void
  label?: string
  className?: string
  add?: boolean
  testId?: string
  icon?: ReactNode
  disabled?: boolean
  onRemove?: () => void
}

export function Chip({
  onClick,
  label,
  children,
  className,
  testId,
  disabled,
  onRemove
}: PropsWithChildren<Props>) {
  return (
    <SChip
      data-testid={testId}
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      <TextBody>{children || label}</TextBody>
      {onRemove && <SIconRemove onClick={onRemove} />}
    </SChip>
  )
}
