import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { TextBodyMedium } from 'components/text/Text'
import { size } from 'core/styles/spacing'
import { color, radius } from 'core/styles/variables'

export const SSellerStatus = styled(TextBodyMedium)<{
  isBlacklisted: boolean
}>`
  display: flex;
  align-items: center;
  gap: ${size(3)};

  align-self: flex-end;
  margin-bottom: ${size(1)};

  height: ${size(8)};
  padding: 6px ${size(4)} 6px ${size(2)};
  border-radius: ${radius('full')};

  ${({ isBlacklisted }) => {
    if (isBlacklisted) {
      return css`
        color: ${color('warning')};
        background: ${color('warning-l-100')};
      `
    }

    return css`
      color: ${color('night-d-100')};
      background: ${color('night-l-700')};
    `
  }};
`
