import { FC } from "react"
import { twMerge } from "tailwind-merge"
import { Icon } from "../Icons"

type Props = {
  className?: string
  text: string
}

const CopyButton: FC<Props> = ({ text, className }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(text)
  }

  return (
    <button onClick={handleCopy} className={twMerge("text-sm flex items-center gap-1", className)}>
      {text}
      <Icon name="Copy01" size="1rem" />
    </button>
  )
}

export default CopyButton
