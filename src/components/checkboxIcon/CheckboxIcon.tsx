import IconCircleCheck from 'core/images/icons/IconCircleCheck.svg'
import IconCirclePlus from 'core/images/icons/IconCirclePlus.svg'
import { SButton, SLabel } from './CheckboxIcon.styled'

interface Props {
  label: string
  isActive: boolean
  onClick: () => void
}

export function CheckboxIcon({ label, isActive, onClick }: Props) {
  return (
    <SButton isActive={isActive} onClick={onClick}>
      {isActive ? <IconCircleCheck /> : <IconCirclePlus />}
      <SLabel size="small">{label}</SLabel>
    </SButton>
  )
}
