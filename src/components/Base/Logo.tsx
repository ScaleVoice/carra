import Image from "next/image"
import { FC } from "react"

interface LogoProps {
  variant?: "light" | "primary"
  width?: number
  height?: number
  className?: string
}

export const Logo: FC<LogoProps> = ({ width = 100, height = 20, variant = "primary", className = "" }) => {
  return (
    <Image
      src={`/images/logo_${variant}.png`}
      alt="Logo"
      width={width}
      height={height}
      priority={true}
      className={className}
    />
  )
}
