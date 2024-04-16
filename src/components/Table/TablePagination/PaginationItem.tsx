import { twMerge } from "tailwind-merge"

interface Props {
  active: boolean
  page: number
  onClick: () => void
}

const PaginationItem = ({ active, page, onClick }: Props) => {
  return (
    <button
      className={twMerge(
        "flex h-[40px] w-[40px] select-none items-center justify-center rounded-[20px] text-center text-sm font-medium text-gray hover:bg-primary-50 hover:text-primary",
        active && "bg-primary-25 text-primary",
      )}
      onClick={onClick}
    >
      {page}
    </button>
  )
}

export default PaginationItem
