import { Text } from "@/components/Text"
import { FC, PropsWithChildren } from "react"
import { twMerge } from "tailwind-merge"

type Props = {
  text?: number | string
  className?: string
}

export const TableCell: FC<PropsWithChildren<Props>> = ({ text, className, children }) => {
  let content: React.ReactNode = <>-</>

  if (text) {
    content = (
      <Text size="sm" className={twMerge("text-gray", className)}>
        {text.toString()}
      </Text>
    )
  }

  if (children) {
    content = children
  }

  return <div className={twMerge("flex items-center", className)}>{content}</div>
}
