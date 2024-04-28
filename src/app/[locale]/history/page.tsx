"use client"

import { Header } from "@/components/Header/Header"
import { TableLayout } from "@/components/Layout/TableLayout"
import { Sidebar } from "@/components/Sidebar/Sidebar"
import { Filters } from "@/sections/tickingList/filters/Filters"
import { useTickingListFilters } from "@/sections/tickingList/filters/useTickingListFilters"
import { TickingListTable } from "@/sections/tickingList/table/TickingListTable"

export default function Page() {
  const { isFilterMenuOpened, toggleSidebar } = useTickingListFilters()

  return (
    <main>
      <Header />

      <TableLayout isSidebarOpened={isFilterMenuOpened}>
        <Sidebar open={isFilterMenuOpened} toggleSidebar={toggleSidebar}>
          <Filters />
        </Sidebar>

        <div className="flex flex-col">
          <TickingListTable />
        </div>
      </TableLayout>
    </main>
  )
}
