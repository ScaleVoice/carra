import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { size } from 'core/styles/spacing'
import { color, radius, time, weight } from 'core/styles/variables'

export const LetterIcon = styled.div<{ selected: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
  width: ${size(6)};
  height: ${size(6)};

  border-radius: ${radius('input')};
  background-color: ${color('night-l-800')};
  color: ${color('night-l-200')};

  font-size: ${size(4)};
  font-weight: ${weight('black')};
  line-height: ${size(6)};
  letter-spacing: 0px;

  transition: color ${time('control')} ease-in-out,
    background-color ${time('control')} ease-in-out;

  &::before {
    content: '';
    position: absolute;
    z-index: -1;
    top: 2px;
    left: 0;

    width: 100%;
    height: 100%;

    background-color: ${color('night-l-650')};
    border-radius: ${radius('input')};
  }

  ${({ selected }) =>
    selected &&
    css`
      color: ${color('white')};
      background-color: ${color('night-l-200')};
    `}
`
