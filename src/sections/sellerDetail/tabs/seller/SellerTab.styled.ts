import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { size } from 'core/styles/spacing'
import { color, radius } from 'core/styles/variables'

export const SSellerFormWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;

  gap: ${size(6)};
`

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

export const SAdLink = styled.a`
  display: flex;
  gap: ${size(2)};
  align-items: center;

  background-color: ${color('night-l-700')};
  color: ${color('night-l-100')};
  padding: ${size(2)} ${size(4)};

  border-radius: ${radius('full')};

  & svg {
    color: ${color('night-l-100')};
  }
`
