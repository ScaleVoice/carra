import { Dispatch, filtersReducer } from "@/sections/filtering/reducer/FiltersReducer"
import { State, initialState } from "@/sections/filtering/reducer/FiltersState"
import { ReactNode, createContext, useContext, useReducer } from "react"

type Props = { children: ReactNode }

const FiltersContext = createContext<
  | {
      state: State
      dispatch: Dispatch
    }
  | undefined
>(undefined)

export function FilterProvider({ children }: Props) {
  const [state, dispatch] = useReducer(filtersReducer, initialState)

  const value = { state, dispatch }

  return <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>
}

export function useFiltersContext() {
  const context = useContext(FiltersContext)

  if (context === undefined) {
    throw new Error("No context provided")
  }

  return context
}
