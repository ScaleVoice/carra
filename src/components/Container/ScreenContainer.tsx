import { FC, PropsWithChildren } from "react"

interface Props extends PropsWithChildren {
  className?: string
}

export const ScreenContainer: FC<Props> = ({ children, className }) => {
  return <main className={`lg:h-screen lg:w-screen ${className}`}>{children}</main>
}
