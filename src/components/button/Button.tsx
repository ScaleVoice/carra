import styled from '@emotion/styled'
import { size } from 'core/styles/spacing'
import { ComponentProps, forwardRef } from 'react'
import {
  SButton,
  SButtonCircle,
  SButtonLink,
  SButtonTransparent
} from './Button.styled'

export const Button = forwardRef<
  HTMLButtonElement,
  ComponentProps<typeof SButton>
>((props, ref) => {
  return <SButton ref={ref} type="button" {...props} />
})

export const ButtonLink = forwardRef<
  HTMLAnchorElement,
  ComponentProps<typeof SButtonLink>
>((props, ref) => {
  return <SButtonLink ref={ref} {...props} />
})

export const ButtonCircle = forwardRef<
  HTMLButtonElement,
  ComponentProps<typeof SButtonCircle>
>((props, ref) => {
  return <SButtonCircle ref={ref} type="button" {...props} />
})

export const ButtonTransparent = forwardRef<
  HTMLButtonElement,
  ComponentProps<typeof SButtonTransparent>
>((props, ref) => {
  return <SButtonTransparent ref={ref} type="button" {...props} />
})

// insert svg into the `as` prop of this component
export const ButtonIcon = styled.div`
  position: absolute;
  top: 50%;
  left: ${size(5)};
  transform: translateY(-50%);
`
