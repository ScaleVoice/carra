import debounce from "debounce"
import { useCallback, useEffect, useMemo, useState } from "react"
import { Option, SelectCategory } from "../types"

export function useSelect<O extends Option>(
  name: string,
  initialQuery = "",
  options: O[] = [],
  onChange: (value: string | string[]) => void,
  categories?: SelectCategory[],
  onQueryChange?: (value: string) => void,
  async = false,
  multi = false,
) {
  const [query, setQuery] = useState(initialQuery)
  console.log("q", typeof query, query, typeof initialQuery, initialQuery)

  const groupedOptions = useMemo(() => {
    return (
      categories?.reduce((acc, category) => {
        const categoryOption = {
          label: category.label,
          value: null,
        } as O
        acc.push(categoryOption)

        for (const item of category.items) {
          const option = options.find((option) => option.value === item)
          if (option) {
            acc.push(option)
          }
        }

        return acc
      }, [] as O[]) || []
    )
  }, [options, categories])

  const filteredOptions = useMemo(() => {
    if (async) {
      return query === "" ? (categories && options.length ? groupedOptions : options) : options
    } else {
      return query === ""
        ? categories && options.length
          ? groupedOptions
          : options
        : options.filter((option) => option.label.toLowerCase().includes(query.toLowerCase()))
    }
  }, [query, options, categories, groupedOptions, async])

  const clear = useCallback(() => {
    onChange(multi ? [] : "")
    setQuery("")
  }, [onChange, setQuery, multi])

  useEffect(() => {
    onQueryChange?.(query)
  }, [onQueryChange, query])

  return useMemo(
    () => ({
      groupedOptions,
      filteredOptions,
      clear,
      query,
      setQuery: async ? debounce(setQuery, 200) : setQuery,
    }),
    [groupedOptions, filteredOptions, clear, query, setQuery, async],
  )
}