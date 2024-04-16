import { QueryProvider } from "@/components/Providers/QueryProvider"
import TranslationsProvider from "@/i18n/TranslationProvider"
import { FilterProvider } from "@/sections/filtering/reducer/FiltersContext"
import { ClerkProvider } from "@clerk/nextjs"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import initTranslations from "../i18n"
import "../index.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ScaleVoice",
  description: "",
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const { resources } = await initTranslations(params.locale)

  return (
    <html lang="en">
      <body className={inter.className}>
        <ClerkProvider>
          <QueryProvider>
            <TranslationsProvider locale={params.locale} resources={resources}>
              <FilterProvider>{children}</FilterProvider>
            </TranslationsProvider>
          </QueryProvider>
        </ClerkProvider>
      </body>
    </html>
  )
}
