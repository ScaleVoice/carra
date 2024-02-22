'use client'

import { useClerk } from '@clerk/clerk-react'
import { useRouter } from 'next/navigation'
import { PropsWithChildren } from 'react'
import styles from './SignOutButton.module.css'

export const SignOutButton = ({ children }: PropsWithChildren) => {
  const { signOut } = useClerk()
  const router = useRouter()

  return (
    <button
      className={styles.button}
      onClick={() => signOut(() => router.push('/'))}
    >
      {children}
    </button>
  )
}
