import appointments from "src/locales/en/appointments.json"
import common from "src/locales/en/common.json"
import nav from "src/locales/en/nav.json"
import tickingList from "src/locales/en/tickingList.json"
import validations from "src/locales/en/validations.json"

export const resources = {
  common,
  nav,
  validations,
  tickingList,
  appointments,
} as const

export const namespaces = ["common", "nav", "validations", "tickingList", "appointments"] as const
