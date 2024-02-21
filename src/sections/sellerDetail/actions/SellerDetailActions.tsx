import { Flex } from 'components/Flex'
import { useRedirectModal } from 'components/redirect/RedirectModal'
import { useTranslation } from 'next-i18next'
import { useContext } from 'react'
import { SellerDetailCtx } from '../SellerDetail.utils'
import { SellerDetailActionsProps } from './SellerDetailActions.utils'
import { SActionButton } from './SellerDetialAction.styled'
import { useCallSummaryModal } from './modal/CallSummaryModal'

export function SellerDetailActions(props: SellerDetailActionsProps) {
  const { t } = useTranslation()
  const { isCalling, setIsCalling } = useContext(SellerDetailCtx)

  const [summaryModal, openSummaryModal] = useCallSummaryModal({
    ...props,
    setIsCalling
  })

  const [redirectModal, openRedirectModal] = useRedirectModal({
    redirectTo: 'appointments'
  })

  const handleCallButtonClick = () => {
    if (isCalling) {
      openSummaryModal()
    } else {
      props.setSelectedTab('callscript')
      setIsCalling(true)
    }
  }

  return (
    <>
      <Flex variant="row" gap={6}>
        <SActionButton
          variant="outline"
          onClick={openRedirectModal}
          disabled={!isCalling}
        >
          {t('seller_detail_actions_book_appointment')}
        </SActionButton>
        <SActionButton variant="primary" onClick={handleCallButtonClick}>
          {isCalling
            ? t('seller_detail_actions_end_call')
            : t('seller_detail_actions_call_client')}
        </SActionButton>
      </Flex>

      {redirectModal}
      {summaryModal}
    </>
  )
}
