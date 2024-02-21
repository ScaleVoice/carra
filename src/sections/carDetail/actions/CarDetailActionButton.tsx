import { useContext } from 'react'
import { CarDetailStateCtx } from '../CarDetail.utils'
import { SActionButton } from './CarDetailActions.styled'
import { getButtonVariant } from './CarDetailActions.utils'

interface Props {
  onClick: () => Promise<void>
  loading: boolean
  isSelected: boolean
  text: string
}

export function TickingAdActionButton({
  onClick,
  loading,
  isSelected,
  text
}: Props) {
  const { readOnly } = useContext(CarDetailStateCtx)

  return (
    <SActionButton
      type="button"
      variant={getButtonVariant(isSelected)}
      onClick={onClick}
      disabled={readOnly || loading || isSelected}
    >
      {text}
    </SActionButton>
  )
}
