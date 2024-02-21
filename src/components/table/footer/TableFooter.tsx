import { Pagination } from 'components/pagination/Pagination'
import { SFooter } from './TableFooter.styled'

interface Props {
  totalPages: number
  page: number
  setPage: (page: number) => void
  className?: string
}

export function TableFooter({ totalPages, page, setPage, className }: Props) {
  return (
    <SFooter variant="row" justify="end" align="center" className={className}>
      <Pagination totalPages={totalPages} page={page} setPage={setPage} />
    </SFooter>
  )
}
