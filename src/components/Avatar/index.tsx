import Image from "next/image"
import { FC, PropsWithChildren } from "react"
import { twMerge } from "tailwind-merge"

interface Props extends PropsWithChildren {
  fullName?: string | null
  url: string
  className?: string
}

export const Avatar: FC<Props> = ({ fullName, url = "", className = "" }) => {
  const initials = getInitials(fullName)

  if (!url) {
    return (
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-300">{initials}</div>
    )
  }
  return (
    <Image
      src={url}
      alt="avatar"
      className={twMerge(`h-10 w-10 shrink-0 rounded-full ${className}`)}
      height={40}
      width={40}
    />
  )
}

function getInitials(fullName?: string | null) {
  const initials = fullName
    ?.split(" ")
    .map((chunk) => chunk.charAt(0).toLocaleUpperCase())
    .slice(0, 2)
    .join("")

  return initials
}
