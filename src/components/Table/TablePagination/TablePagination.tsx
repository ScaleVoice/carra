import PaginationButton from "@/components/Table/TablePagination/PaginationButton"
import PaginationItem from "@/components/Table/TablePagination/PaginationItem"
import getPaginationNumbers from "@/components/Table/TablePagination/getPaginationNumbers"
import { useMemo } from "react"
import { twMerge } from "tailwind-merge"

interface Props {
  className?: string
  totalPages: number
  currentPage: number
  handlePrevButtonOnClick: () => void
  handleNextButtonOnClick: () => void
  handlePaginationNumberOnClick: (page: number) => void
}

const TablePagination = ({
  className,
  currentPage,
  handleNextButtonOnClick,
  handlePaginationNumberOnClick,
  handlePrevButtonOnClick,
  totalPages,
}: Props) => {
  const paginationNumbers = useMemo(() => {
    return getPaginationNumbers(totalPages, currentPage)
  }, [totalPages, currentPage])

  return (
    <div className={twMerge("flex items-center justify-between gap-x-6 px-6 py-5 w-full", className)}>
      <PaginationButton onClick={handlePrevButtonOnClick} disabled={currentPage <= 1} icon="ArrowLeft" />
      
      <div className="flex items-center gap-x-0.5">
        {paginationNumbers.map((item, index) =>
          typeof item === "number" ? (
            <PaginationItem
              active={item === currentPage}
              onClick={() => handlePaginationNumberOnClick(item)}
              page={item}
              key={index}
            />
          ) : (
            <span
              key={index}
              className="flex h-[40px] w-[40px] items-center justify-center rounded-[20px] text-center text-gray"
            >
              {item}
            </span>
          ),
        )}
      </div>

      <PaginationButton onClick={handleNextButtonOnClick} disabled={currentPage == totalPages} icon="ArrowRight" />
    </div>
  )
}

export default TablePagination
