import { useCallback, useState } from "react"

interface Props {
  totalPages: number
}

const usePagination = ({ totalPages }: Props) => {
  const [currentPage, setCurrentPage] = useState(1)

  const handlePrevButtonOnClick = useCallback(() => {
    setCurrentPage((prev) => (prev <= 1 ? 1 : prev - 1))
  }, [])
  const handleNextButtonOnClick = useCallback(() => {
    setCurrentPage((prev) => (prev >= totalPages ? prev : prev + 1))
  }, [totalPages])

  const handlePaginationNumberOnClick = useCallback((page: number) => {
    setCurrentPage(page)
  }, [])

  return { currentPage, handlePrevButtonOnClick, handleNextButtonOnClick, handlePaginationNumberOnClick }
}

export default usePagination
