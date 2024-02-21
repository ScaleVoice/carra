import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Flex } from 'components/Flex'

import { InputSearch } from 'components/inputSearch/InputSearch'
import Logo from 'core/images/Logo.svg'
import { media } from 'core/styles/media'
import { size } from 'core/styles/spacing'
import { color, shadow, time } from 'core/styles/variables'

export const SLogo = styled(Logo)`
  color: ${color('night')};
`

export const SContainer = styled.header<{
  background?: 'night' | 'white' | 'transparent'
  hasShadow?: boolean
}>`
  --header-height: ${size(19)};

  display: grid;
  grid-template-columns: ${size(65)} auto ${size(65)};

  align-items: center;
  max-height: var(--header-height);
  height: var(--header-height);

  box-shadow: ${shadow(2)};

  background: ${({ background }) =>
    background === 'night'
      ? color('night-l-800')
      : background === 'white'
      ? color('white')
      : 'transparent'};

  transition: background ${time('control')};

  @media ${media.lte('tablet')} {
    position: relative;
    max-height: ${size(19)};
    grid-template-columns: ${size(65)} auto;
  }

  ${({ hasShadow }) =>
    hasShadow
      ? css`
          box-shadow: ${shadow(1)};
          z-index: 2;
          right: 0;

          @media ${media.lte('tablet')} {
            position: initial;
            width: initial;
            right: initial;
          }
        `
      : null};
`

export const SAuresAppsLogo = styled.div`
  padding: ${size(4)} ${size(10)};
`

export const SInputSearch = styled(InputSearch)`
  width: ${size(70)};
  border: 2px solid ${color('night-l-700')};
  grid-column-gap: ${size(1)};

  && {
    padding: ${size(0.5)};
    padding-left: ${size(5)};
    box-shadow: none;
  }

  & button[type='button'] {
    padding: ${size(2)} ${size(1)};
    width: ${size(9)};
  }

  @media ${media.lte('tablet')} {
    display: none !important;
  }
`

export const SHeaderLink = styled.span<{ isActive: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding: 5px ${size(2)};
  font-size: 14px;
  height: ${size(12)};
  gap: 3px;

  cursor: pointer;

  ${({ isActive }) => {
    if (isActive) {
      return css`
        span,
        svg {
          color: ${color('night-d-100')};
        }
      `
    }

    return `
      svg {
        color: ${color('night-l-200')};
      };
    `
  }};

  &:hover {
    svg,
    span {
      color: ${color('night-l-100')};
    }
  }
`

export const SHeaderActions = styled.div`
  display: flex;
  gap: ${size(2)};
  justify-content: flex-end;
  align-items: center;
  padding-right: ${size(8)};
`

export const SHeaderLinksWrapper = styled(Flex)`
  @media ${media.lte('tablet')} {
    display: none;
  }
`
