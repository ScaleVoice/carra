import { css } from '@emotion/react'
import { Flex } from 'components/Flex'
import { useCloseModalContext } from 'components/modal/Modal.utils'
import { TextBody, TextHeader } from 'components/text/Text'
import { SellerState } from 'core/api/sellerDetail/actions'
import IconCross from 'core/images/icons/IconCross.svg'
import { size } from 'core/styles/spacing'
import { format } from 'date-fns'
import { SellerStatus } from '../sellerStatus/SellerStatus'
import { SToolbarButton } from './SellerDetailToolbar.styled'

interface Props {
  id: string
  sellerState?: SellerState
  downloadedAt?: string
}

export function SellerDetailToolbar({ id, sellerState, downloadedAt }: Props) {
  const close = useCloseModalContext()

  return (
    <Flex variant="row" justify="between">
      <Flex variant="row" gap={4}>
        <Flex variant="column">
          <TextHeader variant="h5" as="h5">
            {id}
          </TextHeader>

          {downloadedAt && (
            <TextBody size="small">
              {format(Date.parse(downloadedAt), 'dd/MM/yyyy HH:mm')}
            </TextBody>
          )}
        </Flex>

        <SellerStatus sellerState={sellerState} />
      </Flex>

      <Flex variant="row" gap={2}>
        <SToolbarButton variant="tertiary" onClick={close}>
          <IconCross
            css={css`
              width: ${size(5)};
              height: ${size(5)};
            `}
          />
        </SToolbarButton>
      </Flex>
    </Flex>
  )
}
