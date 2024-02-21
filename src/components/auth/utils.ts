import type { NextComponentType, NextPageContext } from 'next'
import type { AppProps as NextAppProps } from 'next/app'

export type NextPageWithAuth = NextComponentType<NextPageContext> & {
  requiresAuth?: boolean
}

export interface AuthAppProps extends NextAppProps {
  Component: NextPageWithAuth
}
