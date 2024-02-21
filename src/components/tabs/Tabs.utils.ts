import { ReactNode } from 'react'

export interface TabConfig<Key extends string> {
  id: Key
  label: string
  Content: ReactNode
}
