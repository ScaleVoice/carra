import common from "src/locales/en/common.json"
import nav from "src/locales/en/nav.json"
import validations from "src/locales/en/validations.json"

export const resources = {
  common,
  nav,
  validations,
} as const

export const namespaces = ["common", "nav", "validations"] as const
