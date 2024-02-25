"use client"

import { createContext, ReactNode, useContext, useReducer } from "react"
import { Dispatch, filtersReducer } from "./FiltersReducer"
import { initialState, State } from "./FiltersState"

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
