import { ReactNode } from 'react'
import { SContainer, SContent } from './Divider.styled'

interface Props {
  text?: ReactNode
  className?: string
  variant?: 'dark' | 'light'
  axis?: 'horizontal' | 'vertical'
}

export function Divider({
  text,
  className,
  variant,
  axis = 'horizontal'
}: Props) {
  return (
    <SContainer className={className} variant={variant} axis={axis}>
      {text && <SContent variant="setup">{text}</SContent>}
    </SContainer>
  )
}
