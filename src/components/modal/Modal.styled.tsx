import styled from '@emotion/styled'
import { inset } from 'core/styles/inset'
import { media } from 'core/styles/media'
import { size } from 'core/styles/spacing'
import { color, radius, shadow, zIndex } from 'core/styles/variables'
import { motion } from 'framer-motion'

export const SBackground = styled.div`
  position: fixed;
  ${inset(0)}

  background-color: ${color('night-d-200', 0.6)};

  z-index: ${zIndex('modal-bg')};
`

export const SContent = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);

  width: ${size(120)};
  max-height: 85vh;

  padding: ${size(10)};
  padding-top: ${size(11)};

  overflow: auto;

  background-color: ${color('white')};
  box-shadow: ${shadow(5)};
  border-radius: ${radius('corner')};
  z-index: ${zIndex('modal')};

  @media ${media.lte('MD')} {
    width: unset;
    left: ${size(4)};
    right: ${size(4)};

    padding: ${size(6)};
    padding-top: ${size(8)};

    transform: translateY(-50%);
  }
`

export const SCloseButton = styled.button`
  position: absolute;
  top: ${size(2)};
  right: ${size(2)};

  display: flex;
  align-items: center;
  justify-content: center;

  width: ${size(8)};
  height: ${size(8)};
  cursor: pointer;

  color: ${color('night-text')};
`
