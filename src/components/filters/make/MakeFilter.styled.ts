import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { ButtonCircle, ButtonTransparent } from 'components/button/Button'
import { TextBody } from 'components/text/Text'
import IconCheck from 'core/images/icons/IconCheck.svg'
import { fadeIn } from 'core/styles/animations'
import { styledScrollbars } from 'core/styles/common'
import { media } from 'core/styles/media'
import { size, spaceY } from 'core/styles/spacing'
import { color, font, radius, time, weight } from 'core/styles/variables'

export const SInputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: ${size(1)} ${size(1)} ${size(1)} ${size(4)};
  background-color: ${color('white')};
  border: 2px solid ${color('night-l-700')};
  border-radius: ${radius('full')};

  cursor: text;
`

export const SInput = styled.input`
  width: 100%;
  border: none;
  font: 400 ${size(4)} ${font('text')};
`

export const SSearchButton = styled(ButtonCircle)`
  width: ${size(10)};
  height: ${size(10)};
  padding: ${size(2)};
`

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

  width: ${size(165)};

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

export const SSelectedMake = styled.div`
  display: flex;
  align-items: center;
`

export const SMakeButtonIcon = styled(SMake)<{ isActive?: boolean }>`
  display: grid;
  place-items: center;

  padding: ${size(2)} 0;

  border-color: ${color('night-l-700')};

  width: ${size(15)};

  @media ${media.lte('mobile')} {
    width: ${size(12)};
  }

  ${({ isActive }) =>
    isActive &&
    css`
      border-color: ${color('night-l-100')};
    `}

  @media ${media.gt('mobile')} {
    padding: ${size(3)} 0;
  }
`

export const SMakeButton = styled(ButtonTransparent)<{
  singleCarMake: boolean
}>`
  padding: ${size(1.5)} 0;
  width: 100%;
  justify-content: flex-start;
  position: relative;
  gap: ${size(1)};
  text-align: start;

  ${({ singleCarMake }) =>
    singleCarMake &&
    css`
      padding: 0;
    `}
`

export const SBackButton = styled(ButtonTransparent)`
  &,
  ${TextBody} {
    color: ${color('night-l-100')};
  }

  svg {
    margin-right: ${size(2)};
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

export const SMakeItem = styled.li<{ isActive?: boolean }>`
  margin-top: 0 !important;

  ${SItemName} {
    ${({ isActive }) =>
      isActive &&
      css`
        color: ${color('night-l-100')};
        font-weight: ${weight('medium')};
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

export const SIcon = styled(IconCheck)`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);

  width: ${size(4)};
  height: ${size(4)};

  color: ${color('night-l-100')};

  animation: fadeInLeft ${time('control')};

  @keyframes fadeInLeft {
    from {
      opacity: 0;
      transform: translate(-${size(2)}, -50%);
    }
    to {
      opacity: 1;
      transform: translate(0, -50%);
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

export const SMakeIcon = styled.img`
  width: ${size(8)};
  height: ${size(8)};
`
