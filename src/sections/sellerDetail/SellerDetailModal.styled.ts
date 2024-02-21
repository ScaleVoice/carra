import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Flex } from 'components/Flex'
import { styledScrollbars } from 'core/styles/common'
import { size } from 'core/styles/spacing'
import { color } from 'core/styles/variables'

export const SModalContent = styled.div<{
  openAdvertisement: boolean
}>`
  display: grid;
  ${({ openAdvertisement }) =>
    css`
      grid-template-columns: ${size(14)} ${openAdvertisement ? size(170) : 0} ${size(
          175
        )};
    `};

  align-items: start;
  transition: 400ms;
`

export const SExpandButtonWrapper = styled(Flex)`
  background-color: ${color('white')};
  height: ${size(14)};
  width: ${size(14)};
  border-radius: ${size(4)} 0 0 ${size(4)};
`

export const SDataWrapper = styled.div<{ withShadow?: boolean }>`
  background-color: ${color('white')};
  height: 100vh;
  ${({ withShadow }) => css`
    box-shadow: ${withShadow ? `0 0 ${size(4)} rgba(0, 0, 0, 0.08)` : 'none'};
  `}

  padding: ${size(10)};
  padding-top: ${size(8)};

  position: relative;
`

export const SCarDetail = styled(Flex)``

export const SCarDetailHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${size(8)};
`

export const carDetailModalWrapperStyles = css`
  background-color: transparent;
  box-shadow: unset;
  top: 0;
  bottom: 0;
  right: 0;
  left: unset;
  max-height: unset;
  transform: none;
  border-radius: 0;
  width: auto;
  padding: 0;
`

export const carDetailModalBackgroundStyles = css`
  background-color: ${color('almond-d-300', 0.6)};
`

export const SForm = styled.form`
  display: flex;
  flex-direction: column;

  justify-content: space-between;

  height: 100%;
`

export const customerDetailTabStyles = css`
  max-height: calc(100vh - ${size(70)});
  padding-right: ${size(1)};
  overflow: auto;

  ${styledScrollbars};
`

export const SIframe = styled.iframe`
  width: 100%;
  height: calc(100vh - ${size(20)});
  overflow-y: auto;
`
