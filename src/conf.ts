export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i
export const PASSWORD_REGEX = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9]{8,}$/i
export const ICO_REGEX = /^\d{8}$/i
export const STREET_REGEX = /^.+\s?\d+\/?\d*$/i
export const ZIP_CODE_REGEX = /^\d{3}\s?\d{2}$/i
export const PHONE_NUMBER_REGEX = /^\+\d{1,3}\s?\d{3}\s?\d{3}\s?\d{3}$/i

export const ROUTES = {
  root: "/",
  register: "/register",
  login: "/login",
  reset: "/reset-password",
  verify: "/verify",
}

export const API_ROUTES = {
  register: `${process.env.NEXT_PUBLIC_API_URL}/users/sign-up`,
}
