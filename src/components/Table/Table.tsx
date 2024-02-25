interface Props {
  headerComponent?: React.ReactNode
  contentComponent: React.ReactNode
  paginationComponent?: React.ReactNode
  notFoundComponent?: React.ReactNode
}

const Table = ({ headerComponent, notFoundComponent, paginationComponent, contentComponent }: Props) => {
  return (
    <div className="flex flex-col">
      {headerComponent}
      {notFoundComponent ? (
        <div className="flex w-full justify-center py-20">{notFoundComponent}</div>
      ) : (
        <>
          {contentComponent}
          {paginationComponent}
        </>
      )}
    </div>
  )
}

export default Table
