import { TextBody } from 'components/text/Text'
import {
  SArrowButton,
  SContainer,
  SPageButton,
  SSeparator
} from './Pagination.styled'
import { resolvePages } from './Pagination.utils'
import { PaginationDots } from './PaginationDots'

import IconChevronRight from 'core/images/icons/IconChevronRight.svg'

interface Props {
  totalPages: number
  page: number
  setPage: (page: number) => void
}

export function Pagination(props: Props) {
  const {
    pages,
    shouldRenderLeftDots,
    shouldRenderRightDots,
    shouldRenderFirstPage,
    shouldRenderLastPage
  } = resolvePages(props.totalPages, props.page)

  return (
    <SContainer>
      {props.page > 1 && (
        <>
          <SArrowButton
            onClick={() => {
              props.setPage(props.page - 1)
            }}
          >
            <IconChevronRight
              css={{
                transform: 'rotate(-180deg)'
              }}
            />
          </SArrowButton>
          <SSeparator />
        </>
      )}

      {shouldRenderFirstPage && (
        <SPageButton active={1 === props.page} onClick={() => props.setPage(1)}>
          <TextBody variant="body" size="large">
            {1}
          </TextBody>
        </SPageButton>
      )}

      {shouldRenderLeftDots && <PaginationDots />}

      {pages.map(page => (
        <SPageButton
          key={page}
          active={page === props.page}
          onClick={() => props.setPage(page)}
        >
          <TextBody variant="body" size="large">
            {page}
          </TextBody>
        </SPageButton>
      ))}

      {shouldRenderRightDots && <PaginationDots />}

      {shouldRenderLastPage && (
        <SPageButton
          active={props.totalPages === props.page}
          onClick={() => props.setPage(props.totalPages)}
        >
          <TextBody variant="body" size="large">
            {props.totalPages}
          </TextBody>
        </SPageButton>
      )}

      {props.page < props.totalPages && (
        <>
          <SSeparator />
          <SArrowButton
            onClick={() => {
              props.setPage(props.page + 1)
            }}
          >
            <IconChevronRight />
          </SArrowButton>
        </>
      )}
    </SContainer>
  )
}
