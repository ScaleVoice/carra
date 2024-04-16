"use client"

import { Header } from "@/components/Header/Header"
import { TableLayout } from "@/components/Layout/TableLayout"
import { useTranslation } from "react-i18next"
// import { useTickingListFilters } from "@/sections/tickingList/filters/TickingListFilters"
import { Sidebar } from "@/components/Sidebar/Sidebar"
import { Filters } from "@/sections/tickingList/filters/Filters"
import { useTickingListFilters } from "@/sections/tickingList/filters/useTickingListFilters"
import { TickingListTable } from "@/sections/tickingList/table/TickingListTable"

export default function Page() {
  const { t } = useTranslation()
  const { isFilterMenuOpened, toggleSidebar } = useTickingListFilters()

  console.log("openFiltersMenu", isFilterMenuOpened)

  return (
    <main>
      <Header />

      <TableLayout isSidebarOpened={isFilterMenuOpened}>
        <Sidebar open={isFilterMenuOpened} toggleSidebar={toggleSidebar}>
          <Filters />
        </Sidebar>

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
