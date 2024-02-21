import Link from 'next/link'
import { useRouter } from 'next/router'
import { SHeaderLink } from './Header.styled'

type Props = {
  href: string
  Icon: JSX.Element
  label: string
  onClick?: () => void
}

export function HeaderLink({ href, Icon, label, onClick }: Props) {
  const { pathname } = useRouter()

  return (
    <Link href={href} onClick={onClick}>
      <SHeaderLink isActive={pathname === href} onClick={onClick}>
        {Icon}
        <span>{label}</span>
      </SHeaderLink>
    </Link>
  )
}
