import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { ButtonTransparent } from 'components/button/Button'
import { TextBody } from 'components/text/Text'
import { fadeIn } from 'core/styles/animations'
import { styledScrollbars } from 'core/styles/common'
import { media } from 'core/styles/media'
import { size, spaceY } from 'core/styles/spacing'
import { color, radius, time } from 'core/styles/variables'

export const SList = styled.ul`
  column-count: 2;
  column-gap: ${size(6)};

  padding: 0 ${size(4)};

  transition: all ${time('control')} ease-in-out;
  animation: ${fadeIn} ${time('control')} ease-in-out;

  ${spaceY(3)}

  @media ${media.gt('mobile')} {
    padding: 0;
    column-count: 5;
  }

  & > li {
    break-inside: avoid;
  }
`

export const SContainer = styled.div`
  position: relative;

  height: auto;
  overflow: auto;

  padding: 0;
  box-shadow: none;

  transition: all ${time('control')} ease-in-out;

  @media ${media.gt('mobile')} {
    /* ${SList} {
      padding: ${size(8)};
    }

    ${SList} {
      padding-top: 0;
    } */
  }

  padding: ${size(8)} ${size(8)};

  min-width: ${size(150)};

  ${styledScrollbars};
`

export const SMakes = styled.div`
  display: grid;
  grid-gap: ${size(2)};
  grid-template-columns: repeat(auto-fill, minmax(${size(12)}, 1fr));

  /* padding: 0 ${size(4)} ${size(4)} ${size(4)}; */

  animation: ${fadeIn} ${time('control')} ease-in-out;

  @media ${media.gt('SM')} {
    grid-template-columns: repeat(auto-fill, minmax(${size(15)}, 1fr));
    /* padding: 0 ${size(8)} ${size(8)} ${size(8)}; */
  }
`

export const SMake = styled(ButtonTransparent)`
  padding: ${size(2)};

  border: 2px solid ${color('night-l-200')};
  border-radius: ${radius('corner-smaller')};

  svg {
    height: ${size(8)};
    width: ${size(8)};
  }

  @media ${media.gt('mobile')} {
    padding: ${size(3)};
  }
`

export const SItemName = styled(TextBody)`
  display: inline-block;
  transition: all ${time('control')} ease-in-out;
`

export const SModelButton = styled(ButtonTransparent)`
  position: relative;

  display: flex;
  align-items: center;
  text-align: start;

  padding: ${size(1.5)} 0;
  width: 100%;
  justify-content: flex-start;
`

export const SItem = styled.li<{ isActive?: boolean }>`
  margin-top: 0 !important;

  ${SItemName} {
    ${({ isActive }) =>
      isActive &&
      css`
        margin-left: ${size(5)};
      `}
  }

  @media (hover: hover) {
    &:hover {
      ${SItemName} {
        color: ${color('night-l-100')};
      }
    }
  }
`

export const SActiveModelsCount = styled.div`
  background-color: ${color('night-l-100')};
  color: ${color('white')};

  font-size: 12px;

  height: ${size(4)};
  padding: 0 ${size(1)};

  display: flex;
  align-items: center;

  border-radius: ${radius('corner-smallest')};
`

export const SSelectedMake = styled.div`
  display: flex;
  align-items: center;
`
