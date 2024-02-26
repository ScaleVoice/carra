import { SignUp as SignUpClerk } from "@clerk/nextjs"
import styles from "./form.module.css"

type SignInAppearance = Parameters<typeof SignUpClerk>[0]["appearance"]

const signInAppearance: SignInAppearance = {
  elements: styles,
}

export const SignUp: typeof SignUpClerk = (props) => {
  return <SignUpClerk {...props} routing="virtual" appearance={signInAppearance} signInUrl="/sign-in" />
}
