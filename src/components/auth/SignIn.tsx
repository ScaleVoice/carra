import { SignIn as SignInClerk } from '@clerk/nextjs'
import styles from './form.module.css'
import AuthLayout from './AuthLayout'

type SignInAppearance = Parameters<typeof SignInClerk>[0]['appearance']

const signInAppearance: SignInAppearance = {
  elements: styles
}

export const SignIn: typeof SignInClerk = props => {
  return (
    <AuthLayout>
      <SignInClerk
        {...props}
        routing="virtual"
        signUpUrl="/sign-up"
        appearance={signInAppearance}
      />
    </AuthLayout>
  )
}
