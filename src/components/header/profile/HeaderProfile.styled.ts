import styled from '@emotion/styled'
import { ButtonTransparent } from 'components/button/Button'
import { size } from 'core/styles/spacing'
import { color, radius } from 'core/styles/variables'
import Image from 'next/image'

export const SImage = styled(Image)`
  border-radius: ${radius('full')};
`

export const SItem = styled(ButtonTransparent)`
  width: ${size(40)};

  display: flex;
  justify-content: space-between;
  align-content: center;

  color: ${color('night-text')};
`
