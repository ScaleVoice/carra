import { PropsWithChildren } from 'react'
import { SLoginLayout } from './Login.styled'

export function LoginLayout({ children }: PropsWithChildren) {
  return <SLoginLayout>{children}</SLoginLayout>
}
