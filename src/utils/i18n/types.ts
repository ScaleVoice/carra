import type { CustomTypeOptions } from 'i18next'

export type Namespaces = CustomTypeOptions['resources']

export type AnyNamespace = keyof Namespaces
export type NotCommonNamespace = Exclude<AnyNamespace, 'common'>
