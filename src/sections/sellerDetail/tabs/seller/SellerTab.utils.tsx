import { css } from '@emotion/react'
import { createColumnHelper } from '@tanstack/table-core'
import { TextBody, TextBodyMedium } from 'components/text/Text'
import IconExternalLink from 'core/images/icons/IconExternalLink.svg'
import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'
import { SellerAdItem } from 'sections/sellerDetail/SellerDetail.utils'
import { formatCurrency } from 'utils/currency'
import { parseDomainFromUrl } from 'utils/parseDomainFromUrl'
import { SAdLink } from './SellerTab.styled'

const { accessor } = createColumnHelper<SellerAdItem & { carName: string }>()

export function useSellerTabColumns() {
  const { t } = useTranslation()

  return useMemo(
    () => [
      accessor('carName', {
        header: () => null,
        cell: props => <TextBody size="small">{props.getValue()}</TextBody>,
        size: 160
      }),
      accessor('adNo', {
        header: () => null,
        cell: props => (
          <TextBody
            size="small"
            css={css`
              width: 100%;
              text-align: center;
            `}
          >
            {parseDomainFromUrl(props.row.original.adUrl)}
          </TextBody>
        ),
        size: 120
      }),
      accessor('expectedPrice', {
        header: () => null,
        cell: props => {
          const price = props.getValue()

          return price ? (
            <TextBodyMedium size="small" color="black">
              {formatCurrency(price)}
            </TextBodyMedium>
          ) : (
            '-'
          )
        },
        size: 80
      }),
      accessor('adUrl', {
        header: () => null,
        cell: props => (
          <SAdLink href={props.getValue()} target="_blank">
            <TextBodyMedium color="night-l-100">
              {t('seller_detail_view_ad')}
            </TextBodyMedium>

            <IconExternalLink />
          </SAdLink>
        ),
        size: 100
      })
    ],
    [t]
  )
}
