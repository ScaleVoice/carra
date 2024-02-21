import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { size } from 'core/styles/spacing'
import { color } from 'core/styles/variables'
import { motion } from 'framer-motion'

export const STabs = styled.ul<{ tabsCount: number }>`
  display: grid;
  grid-template-columns: ${({ tabsCount }) => `repeat(${tabsCount}, 1fr)`};

  border-bottom: 1px solid ${color('night-l-650')};
`

export const STabItem = styled.li<{ isSelected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${size(2)} ${size(4)};
  cursor: pointer;
  position: relative;

  ${({ isSelected }) =>
    isSelected &&
    css`
      & span {
        color: ${color('black')};
      }
    `}

  @media (hover: hover) {
    &:hover {
      span {
        color: ${color('black')};
      }
    }
  }
`

export const SSelectedBorder = styled(motion.div)`
  position: absolute;
  bottom: -1px;
  height: 2px;
  right: 0;
  left: 0;
  background: ${color('night-l-100')};
`
