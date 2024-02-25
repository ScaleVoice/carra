import styled from '@emotion/styled'
import { Flex } from 'components/Flex'
import { ButtonTransparent } from 'components/button/Button'
import { styledScrollbars } from 'core/styles/common'
import { size } from 'core/styles/spacing'

export const SWrapper = styled(Flex)`
  padding: ${size(6)} ${size(10)};
`

export const SFilterMenu = styled.div`
  display: grid;
  grid-template-columns: ${size(100)} auto;
  align-items: start;

  gap: ${size(4)};
`

export const SActiveFilters = styled(Flex)`
  max-width: calc(100% - ${size(40)});
  overflow-x: auto;

  ${styledScrollbars}
  padding-bottom: 2px;

  & span {
    width: max-content;
  }
`

export const SClearAllButton = styled(ButtonTransparent)``
