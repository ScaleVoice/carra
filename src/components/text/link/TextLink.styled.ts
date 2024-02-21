import styled from '@emotion/styled'
import { color } from 'core/styles/variables'
import { TextBodyBold } from '../Text'

export const SText = styled(TextBodyBold)`
  color: ${color('night-l-100')};
  cursor: pointer;

  &:any-link {
    color: ${color('night-l-100')};
  }

  @media (hover: hover) {
    &:hover {
      text-decoration: underline;
    }
  }
`
