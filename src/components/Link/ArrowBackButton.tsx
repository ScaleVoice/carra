import Image from "next/image"
import { FC } from "react"

interface Props {
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void
}

export const ArrowBackButton: FC<Props> = ({ onClick }) => {
  const handleBack = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()

    if (onClick) {
      onClick(e)
    } else {
      history.back()
    }
  }

  return (
    <button onClick={handleBack} className="mr-8 mt-2 hidden lg:block">
      <Image src="/assets/images/arrow-back-circle.svg" alt="Arrow" width={40} height={40} />
    </button>
  )
}
