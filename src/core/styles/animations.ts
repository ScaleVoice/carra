import { keyframes } from '@emotion/react'
import { size } from 'core/styles/spacing'

export const fadeIn = keyframes`
  from {
   opacity: 0;
  }
  to {
   opacity: 1;
  }
`

export const fadeInTop = keyframes`
  from {
    opacity: 0;
    transform: translateY(-${size(4)});
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`
