import { ButtonTransparent } from 'components/button/Button'
import { Spacer } from 'components/spacer/Spacer'
import IconCopy from 'core/images/icons/IconCopy.svg'
import { color } from 'core/styles/variables'
import { useCopyToClipboard } from 'utils/hooks'
import { SLinkWrapper } from './ExternalLink.styled'

interface Props {
  url?: string
  canBeCopied?: boolean
}

export function ExternalLink({ url, canBeCopied }: Props) {
  const { copyToClipboard } = useCopyToClipboard()

  if (!url) {
    return null
  }

  const handleCopy = () => {
    copyToClipboard(url)
  }

  return (
    <SLinkWrapper>
      <a href={url} target="_blank">
        {url}
      </a>

      <Spacer size={1} axis="horizontal" />

      {canBeCopied && (
        <ButtonTransparent onClick={handleCopy}>
          <IconCopy color={color('night-l-100')} />
        </ButtonTransparent>
      )}
    </SLinkWrapper>
  )
}
