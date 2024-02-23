import RouterLink from "next/link"
import { FC } from "react"
import { twMerge } from "tailwind-merge"

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  className?: string
}

export const Link: FC<Props> = ({ href, className, children }) => {
  return (
    <RouterLink href={href} className={twMerge(`text-primary-700 ${className}`)}>
      {children}
    </RouterLink>
  )
}
