import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { ButtonCircle } from 'components/button/Button'
import { Spinner } from 'components/spinner/Spinner'
import { TextBody } from 'components/text/Text'
import { media } from 'core/styles/media'
import { size } from 'core/styles/spacing'
import { color, font, radius, shadow, weight } from 'core/styles/variables'

export const SContainer = styled.div<{
  noOutline: boolean
  showPlaceholderIcon?: boolean
}>`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr auto;
  grid-column-gap: ${size(2)};

  padding: ${size(1)};
  padding-left: ${({ showPlaceholderIcon }) =>
    size(showPlaceholderIcon ? 5 : 8)};

  border-radius: ${radius('full')};
  background-color: ${color('white')};

  ${({ noOutline }) =>
    noOutline
      ? `box-shadow: ${shadow(1)};`
      : `border: 2px solid ${color('night-l-700')};`}
`

export const SInputContainer = styled.div`
  display: flex;
  flex-flow: column;

  width: 100%;

  ${TextBody} {
    color: ${color('black')};
    font-weight: ${weight('bold')};
    line-height: ${size(6)};
  }
`

export const SInput = styled.input<{ noLabel: boolean }>`
  border: none;
  padding: 0;

  font-family: ${font('text')};
  font-size: 14px;
  line-height: ${size(5)};

  @media ${media.gt('mobile')} {
    ${({ noLabel }) => css`
      font-size: ${noLabel ? size(4) : '14px'};
      line-height: ${noLabel ? size(6) : size(5)};
    `}
  }
`

export const SButton = styled(ButtonCircle)`
  width: ${size(10)};
  height: ${size(10)};

  display: flex;
  align-items: center;
  justify-content: center;

  padding: ${size(2)};

  svg {
    width: ${size(6)};
    height: ${size(6)};
  }
`

export const SButtonClear = styled(SButton)`
  padding: calc(${size(2)} + 2px);

  color: ${color('night-text')};
  border: none;
`

export const SSpinner = styled(Spinner)`
  filter: grayscale(1);
`
