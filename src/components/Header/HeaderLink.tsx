import Link from "next/link"
import { usePathname } from "next/navigation"
import { twMerge } from "tailwind-merge"

type Props = {
  href: string
  Icon: JSX.Element
  label: string
}

export function HeaderLink({ href, Icon, label }: Props) {
  const pathname = usePathname()
  const isActive = pathname === href
  const activeStyles = "[&>svg]:text-primary text-primary"

  return (
    <Link href={href} className={"group"}>
      <div
        className={twMerge(
          "group flex h-12 cursor-pointer flex-col items-center justify-end px-5 py-1 text-gray-300 group-hover:text-primary-400 [&>svg]:text-gray-300 group-hover:[&>svg]:text-primary-400",
          isActive && activeStyles,
        )}
      >
        {Icon}
        {label}
      </div>
    </Link>
  )
}
