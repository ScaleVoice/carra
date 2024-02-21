import { ReactNode } from 'react'
import { STableLayout } from './TableLayout.styled'

interface Props {
  children: ReactNode
  openedFilters: boolean
}

export function TableLayout({ children, openedFilters }: Props) {
  return <STableLayout openedFilters={openedFilters}>{children}</STableLayout>
}
