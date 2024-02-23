import "i18next"
import { resources } from "./src/i18n/locales"

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "common"
    resources: typeof resources
  }
}
