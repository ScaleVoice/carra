import styled from '@emotion/styled'
import { size } from 'core/styles/spacing'
import { color } from 'core/styles/variables'

export const SLinkWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${color('night-l-100')};
  background-color: ${color('night-l-700')};
  padding: 10px ${size(4)};
  font-size: 14px;

  border-radius: ${size(2)};

  a {
    max-width: 250px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`
