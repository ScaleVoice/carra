export const STORAGE_KEYS_PREFIX = 'driverama'

export type LOCAL_STORAGE_KEYS =
  | 'locale'
  | 'userId'
  | 'userType'
  | 'userInfo'
  | 'opportunityId'
  | 'vin'
  | 'phoneNumber'
  | 'email'
  | 'businessCountry'

export type SESSION_STORAGE_KEYS =
  | 'loginRedirect'
  | 'currPage'
  | 'prevPage'
  | 'phoneNumber'

export type MEMORY_STORAGE_KEYS =
  | 'authPhoneNumber'
  | 'authEmail'
  | 'authPhoneVerificationId'
