"use client"

import initTranslations from "@/app/i18n"
import { resources } from "@/i18n/locales"
import { createInstance } from "i18next"
import { PropsWithChildren } from "react"
import { I18nextProvider, I18nextProviderProps } from "react-i18next"

interface TranslationsProviderProps extends PropsWithChildren {
  locale: string
  resources?: typeof resources
}

export default function TranslationsProvider({ children, locale, resources }: TranslationsProviderProps) {
  const i18n = createInstance() as I18nextProviderProps["i18n"]

  initTranslations(locale, i18n, resources)

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
}
