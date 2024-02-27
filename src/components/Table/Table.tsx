import { LoadingSpinner } from "../Base/Loading"

interface Props {
  isLoading: boolean
  headerComponent?: React.ReactNode
  contentComponent: React.ReactNode
  paginationComponent?: React.ReactNode
  notFoundComponent?: React.ReactNode
}

const Table = ({ isLoading, headerComponent, notFoundComponent, paginationComponent, contentComponent }: Props) => {
  return (
    <>
      <div className="flex flex-col p-10">
        {headerComponent}
        {isLoading ? (
          <div className="flex w-full items-center justify-center pt-10">
            <LoadingSpinner variant="light" className="h-14 w-14" />
          </div>
        ) : (
          notFoundComponent || contentComponent
        )}
      </div>
      {paginationComponent}
    </>
  )
}

export default Table
