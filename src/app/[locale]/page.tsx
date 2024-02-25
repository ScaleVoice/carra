"use client"

import { useTranslation } from "react-i18next"

export const runtime = "edge" // 'nodejs' (default) | 'edge'

import { TableLayout } from "@/components/Layout/TableLayout"
import { Header } from "@/components/Header/Header"
import { TableFilters } from "@/sections/filtering/TableFilters"
import { TableFiltersToolbar } from "@/sections/filtering/TableFiltersToolbar"
import { initialState } from "@/sections/filtering/reducer/FiltersState"
// import { useTickingListFilters } from "@/sections/tickingList/filters/TickingListFilters"
import { TickingListTable } from "@/sections/tickingList/table/TickingListTable"

export default function Page() {
  const { t } = useTranslation()
  // const { filters, defaultSearch, onSearch, clear, openedFilters, toggleOpenFilters, activeFilters } =
  //   useTickingListFilters()

  return (
    <main>
      <Header  />

      <TableLayout openedFilters={false}>
        {/* <TableFilters filters={filters} openedFilters={openedFilters} toggleFiltersMenu={toggleOpenFilters} /> */}

        <div className="flex flex-col">
          {/* <TableFiltersToolbar
            initialFilters={initialState.tickingList.filters}
            activeFilters={activeFilters}
            filters={filters}
            onClearAll={clear}
            onSearch={onSearch}
            defaultSearch={defaultSearch}
          /> */}

          <TickingListTable />
        </div>
      </TableLayout>
    </main>
  )
}
