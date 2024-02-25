import { useDebounce } from "@/hooks/useDebounce"
import { useCallback, useState } from "react"

const useSearch = () => {
  const [searchValue, setSearchValue] = useState("")

  const handleSetSearchValue = useCallback((value: string) => {
    setSearchValue(value)
  }, [])

  const debouncedSearchValue = useDebounce<string>(searchValue, 500)

  return { searchValue, handleSetSearchValue, debouncedSearchValue }
}

export default useSearch
