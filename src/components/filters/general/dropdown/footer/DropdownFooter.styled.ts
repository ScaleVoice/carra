import styled from '@emotion/styled'
import { Button } from 'components/button/Button'
import { TextSubhead } from 'components/text/Text'
import { media } from 'core/styles/media'
import { size } from 'core/styles/spacing'
import { color, radius } from 'core/styles/variables'

export const SContainer = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;

  padding: 18px ${size(6)} 14px;
  gap: 10px;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: ${size(18)};

  background-color: ${color('white')};
  border-top: 2px solid ${color('night-l-700')};
  border-bottom-left-radius: ${radius('corner')};
  border-bottom-right-radius: ${radius('corner')};

  ${TextSubhead} {
    color: ${color('night-text')};
  }

  strong {
    color: ${color('black')};
  }

  @media ${media.lte('mobile')} {
    height: ${size(16)};
  }
`

export const SButton = styled(Button)`
  padding: ${size(3)} 0;
  max-height: ${size(10)};
`
