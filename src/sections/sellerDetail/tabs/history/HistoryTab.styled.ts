import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { size } from 'core/styles/spacing'
import { color } from 'core/styles/variables'

export const SListItem = styled.li<{ isLast?: boolean }>`
  display: flex;

  align-items: center;
  justify-content: space-between;
  gap: ${size(4)};

  padding: ${size(4)} 0;

  ${({ isLast }) => {
    if (isLast) {
      return css`
        border-bottom: 0;
      `
    }

    return css`
      border-bottom: 2px solid ${color('night-l-650')};
    `
  }}
`
