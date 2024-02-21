import 'i18next'

import callCustomer from './public/locales/en/callCustomer.json'
import common from './public/locales/en/common.json'
import history from './public/locales/en/history.json'
import login from './public/locales/en/login.json'
import tickingList from './public/locales/en/tickingList.json'
declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common'
    resources: {
      common: typeof common
      tickingList: typeof tickingList
      callCustomer: typeof callCustomer
      history: typeof history
      login: typeof login
    }
  }
}
