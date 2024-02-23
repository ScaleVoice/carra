import Image from "next/image"
import { FC } from "react"

interface LogoProps {
  variant?: "light" | "primary"
  width?: number
  height?: number
  className?: string
}

export const Logo: FC<LogoProps> = ({ width = 168, height = 46, variant = "light", className = "" }) => {
  return (
    <Image
      src={`/assets/images/logo_${variant}.svg`}
      alt="Logo"
      width={width}
      height={height}
      priority={true}
      className={className}
    />
  )
}
