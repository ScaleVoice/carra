import { SellerState } from 'core/api/sellerDetail/actions'
import IconCircleCheck from 'core/images/icons/IconCircleCheck.svg'
import IconNotAllowed from 'core/images/icons/IconNotAllowed.svg'
import { useTranslation } from 'next-i18next'
import { isNil } from 'utils/types'
import { SSellerStatus } from './SellerStatus.styled'

interface Props {
  sellerState?: SellerState
}

export function SellerStatus({ sellerState }: Props) {
  const { t } = useTranslation()

  if (isNil(sellerState)) {
    return null
  }

  const isBlacklisted = sellerState === 'BLACKLISTED'

  return (
    <SSellerStatus isBlacklisted={isBlacklisted} size="small">
      {isBlacklisted ? <IconNotAllowed /> : <IconCircleCheck />}
      {isBlacklisted
        ? t('seller_detail_status_blacklisted')
        : t('seller_detail_status_whitelisted')}
    </SSellerStatus>
  )
}
