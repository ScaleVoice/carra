import styled from '@emotion/styled'
import { size } from 'core/styles/spacing'
import { color, font, radius, weight } from 'core/styles/variables'
import { motion } from 'framer-motion'

export const SArrow = styled.div`
  position: absolute;
  width: ${size(3)};
  height: ${size(3)};
  background: inherit;
  visibility: hidden;

  &::before {
    position: absolute;
    width: ${size(3)};
    height: ${size(3)};
    background: inherit;
    visibility: visible;
    content: '';
    transform: translateX(-50%) rotate(45deg);
  }
`

export const SBox = styled(motion.div)`
  padding: ${size(2)} ${size(3)};
  max-width: ${size(80)};

  background-color: ${color('almond-d-300')};
  border-radius: ${radius('corner-smaller')};

  font-family: ${font('text')};
  font-size: 11px;
  font-weight: ${weight('medium')};
  line-height: 16px;
  color: ${color('white')};
  text-align: start;

  &[data-placement^='top'] > ${SArrow} {
    bottom: -4px;
  }

  &[data-placement^='bottom'] > ${SArrow} {
    top: -4px;
  }

  &[data-placement^='left'] > ${SArrow} {
    right: -11px;
  }

  &[data-placement^='right'] > ${SArrow} {
    left: 0;
  }
`
