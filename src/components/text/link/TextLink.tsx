import styled from '@emotion/styled'
import { color, weight } from 'core/styles/variables'
import Link from 'next/link'
import { ComponentProps, PropsWithChildren } from 'react'
import { SText } from './TextLink.styled'

type Props = {
  className?: string
  href?: string
  onClick?: () => void
  openNewTab?: boolean
} & ComponentProps<typeof SText>

export function TextLink(props: PropsWithChildren<Props>) {
  const { className, href, onClick, openNewTab, children, ...textProps } = props

  const newTabProps = { target: '_blank', rel: 'noopener noreferrer' }

  if (!href) {
    return (
      <SText
        {...textProps}
        as="a"
        className={className}
        onClick={onClick}
        {...(openNewTab && newTabProps)}
      >
        {children}
      </SText>
    )
  }

  return (
    <Link href={href} passHref>
      <SText
        {...textProps}
        as="a"
        className={className}
        onClick={onClick}
        {...(openNewTab && newTabProps)}
      >
        {children}
      </SText>
    </Link>
  )
}

export const TextLinkUnderline = styled(TextLink)`
  font-weight: ${weight('regular')};

  &:any-link {
    color: ${color('night-text')};
    text-decoration: underline;
  }
`
