import { PropsWithChildren } from 'react'
import styles from './layout.module.css'

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div
      className={`${styles.container} relative flex min-h-screen flex-col items-center`}
    >
      <div className={`${styles.children} flex items-center min-h-screen`}>
        {children}
      </div>
      <div className={styles.bubbleCenter} />
      <div className={styles.bubbleLeft} />
      <div className={styles.bubbleRight} />
    </div>
  )
}
