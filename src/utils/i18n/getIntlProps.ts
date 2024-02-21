// @ts-expect-error
import { globalI18n } from 'next-i18next/dist/commonjs/appWithTranslation'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { AnyNamespace, NotCommonNamespace } from './types'
import config from '../../../next-i18next.config'

export async function getIntlProps(
  context: {
    locale?: string | undefined
  },
  loadNamespaces?: NotCommonNamespace | NotCommonNamespace[]
) {
  if (config.reloadOnPrerender) {
    await globalI18n?.reloadResources()
  }

  const lng = context.locale || 'en'

  const namespaces = ['common', loadNamespaces ?? []].flat() as AnyNamespace[]

  return serverSideTranslations(lng, namespaces, config)
}
