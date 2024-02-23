import { SignIn as SignInClerk } from "@clerk/nextjs"
import styles from "./form.module.css"

type SignInAppearance = Parameters<typeof SignInClerk>[0]["appearance"]

const signInAppearance: SignInAppearance = {
  elements: styles,
}

export const SignIn: typeof SignInClerk = (props) => {
  return <SignInClerk {...props} routing="virtual" signUpUrl="/sign-up" appearance={signInAppearance} />
}
