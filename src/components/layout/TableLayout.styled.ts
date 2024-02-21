import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { size } from 'core/styles/spacing'

export const STableLayout = styled.div<{ openedFilters: boolean }>`
  display: grid;

  ${({ openedFilters }) => {
    if (openedFilters) {
      return css`
        grid-template-columns: ${size(65)} calc(100vw - ${size(65)});
      `
    }

    return css`
      grid-template-columns: ${size(20)} calc(100vw - ${size(20)});
    `
  }}

  transition: 400ms;
`
