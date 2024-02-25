interface Props {
  titleComponent?: React.ReactNode
  searchComponent?: React.ReactNode
  buttonComponent?: React.ReactNode
  moreButtonComponent?: React.ReactNode
}

const TableHeader = ({ buttonComponent, moreButtonComponent, searchComponent, titleComponent }: Props) => {
  return (
    <div className="flex items-center justify-between gap-x-4 p-6">
      <div>{titleComponent}</div>
      {(searchComponent || buttonComponent || moreButtonComponent) && (
        <div className="flex items-center gap-x-10">
          {searchComponent}
          {buttonComponent}
          {moreButtonComponent}
        </div>
      )}
    </div>
  )
}

export default TableHeader
