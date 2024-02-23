"use client"

import { useTranslation } from "react-i18next"

export const runtime = "edge" // 'nodejs' (default) | 'edge'

export default function Page(props) {
  const { t } = useTranslation()
  return <div></div>
}
