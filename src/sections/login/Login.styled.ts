import styled from '@emotion/styled'
import { Flex } from 'components/Flex'
import { Button } from 'components/button/Button'
import { TextBody } from 'components/text/Text'
import { media } from 'core/styles/media'
import { size } from 'core/styles/spacing'

export const SLoginLayout = styled.main`
  --login-header-height: ${size(20)};

  height: 100%;
  display: grid;
  grid-template-rows: var(--login-header-height) calc(
      100vh - var(--login-header-height)
    );

  @media ${media.lte('MD')} {
    grid-template-columns: 1fr;
  }
`

export const SLoginActions = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding-top: ${size(20)};

  @media ${media.lte('LG')} {
    padding-top: ${size(5)};
    justify-content: flex-end;
    padding-bottom: ${size(10)};
  }
`

export const SLoginLogoContainer = styled(Flex)`
  height: ${size(19)};
`

export const SAuresAppsLoginLogo = styled.div`
  padding: ${size(4)} ${size(10)};
`

export const SButton = styled(Button)`
  width: ${size(100)};

  @media ${media.lte('SM')} {
    width: calc(100vw - ${size(10)});
  }
`

export const SError = styled(TextBody)`
  max-width: ${size(100)};

  @media ${media.lte('SM')} {
    max-width: calc(100vw - ${size(10)});
  }
`

export const SDriverWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 100px;

  @media ${media.lte('XL')} {
    right: 0px;
  }

  @media ${media.lte('LG')} {
    left: 50%;
    right: unset;
    transform: translateX(-50%);
    svg {
      height: 50vh;
    }
  }
`
