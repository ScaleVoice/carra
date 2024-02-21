import { SerializedStyles, css } from '@emotion/react'
import {
  ColumnDef,
  RowData,
  flexRender,
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table'
import { size } from 'core/styles/spacing'
import { color } from 'core/styles/variables'
import { useCallback, useRef } from 'react'
import { useIntersection } from 'react-use'
import {
  SDataCell,
  SHeaderCell,
  SScrollMore,
  STable,
  STableBody,
  STableContainer,
  STableHeader
} from './Table.styled'
import { ScrollForMore } from './loading/ScrollMore'

interface TableProps<T extends RowData> {
  data: T[]
  columns: ColumnDef<T, any>[]
  onRowClick?: (row: T) => void
  containerStyles?: SerializedStyles
  openedFilters?: boolean
  withoutHeader?: boolean
  withoutScrollIndicator?: boolean
  leftPadding?: number
  scrollIndicatorStyles?: SerializedStyles
}

export function Table<T>({
  data,
  columns,
  onRowClick,
  containerStyles,
  openedFilters,
  withoutHeader = false,
  withoutScrollIndicator = false,
  leftPadding = 10,
  scrollIndicatorStyles
}: TableProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null)
  const lastTableElRef = useRef<HTMLTableRowElement>(null)

  const intersection = useIntersection(lastTableElRef, {
    root: containerRef.current,
    rootMargin: size(5),
    threshold: 0
  })

  const resetScrollAfterPaginationChange = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }, [])

  const table = useReactTable<T>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange: resetScrollAfterPaginationChange,
    manualSorting: true,
    initialState: {
      sorting: []
    }
  })

  return (
    <>
      <STableContainer css={containerStyles} ref={containerRef}>
        <STable>
          {!withoutHeader && (
            <STableHeader>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header, index) => (
                    <SHeaderCell
                      leftPadding={leftPadding}
                      key={header.id}
                      index={index}
                      style={{ width: header.column.getSize() }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </SHeaderCell>
                  ))}
                </tr>
              ))}
            </STableHeader>
          )}

          <STableBody>
            {table.getRowModel().rows.map(row => (
              <tr
                key={row.id}
                onClick={() => onRowClick?.(row.original)}
                css={css`
                  @media (hover: hover) {
                    &:hover {
                      background-color: ${!!onRowClick
                        ? color('night-l-700')
                        : undefined};
                    }
                  }

                  cursor: ${!!onRowClick && 'pointer'};
                `}
              >
                {row.getVisibleCells().map((cell, index) => (
                  <SDataCell
                    leftPadding={leftPadding}
                    key={cell.id}
                    index={index}
                    style={{ width: cell.column.getSize() }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </SDataCell>
                ))}
              </tr>
            ))}
            <tr
              ref={lastTableElRef}
              css={css`
                height: ${size(1)};
                width: 100%;
              `}
            />
          </STableBody>
        </STable>
      </STableContainer>

      {!withoutScrollIndicator && !intersection?.isIntersecting && (
        <SScrollMore
          variant="row"
          justify="center"
          openedFilters={openedFilters}
          css={scrollIndicatorStyles}
        >
          <ScrollForMore />
        </SScrollMore>
      )}
    </>
  )
}
