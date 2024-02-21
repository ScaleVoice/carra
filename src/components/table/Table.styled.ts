import styled from '@emotion/styled'
import { Flex } from 'components/Flex'
import { fadeIn } from 'core/styles/animations'
import { styledScrollbars } from 'core/styles/common'
import { size } from 'core/styles/spacing'
import { color, time } from 'core/styles/variables'

export const STableContainer = styled.div`
  max-height: 100%;
  overflow: auto;
  ${styledScrollbars};
`

export const STable = styled.table`
  width: 100%;
  animation: ${fadeIn} ${time('control')} ease-in-out;

  table-layout: fixed;
`

export const STableHeader = styled.thead`
  padding: ${size(2)} ${size(3)};

  position: sticky;
  top: 0;

  background-color: ${color('night-l-700')};
  color: ${color('night-l-200')};

  height: ${size(11)};
`
export const STableBody = styled.tbody`
  background-color: ${color('white')};
`

export const SHeaderCell = styled.th<{ index: number; leftPadding: number }>`
  vertical-align: middle;
  padding: ${size(2)};

  padding-left: ${({ index, leftPadding }) =>
    !index ? size(leftPadding) : size(2)};
`

export const SDataCell = styled.td<{ index: number; leftPadding: number }>`
  padding: ${size(4)} ${size(2)};
  vertical-align: middle;
  padding-left: ${({ index, leftPadding }) =>
    !index ? size(leftPadding) : size(2)};
  border-bottom: 2px solid ${color('night-l-700')};
`

export const SScrollMore = styled(Flex)<{ openedFilters?: boolean }>`
  position: fixed;
  height: ${size(5)};

  bottom: ${size(18)};
  left: ${({ openedFilters }) => (openedFilters ? size(65) : 0)};
  transition: left 400ms;

  right: 0;
`
