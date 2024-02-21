import { css } from '@emotion/react'
import { ButtonTransparent } from 'components/button/Button'
import { Spacer } from 'components/spacer/Spacer'
import { Tabs } from 'components/tabs/Tabs'
import IconDoubleChevronLeft from 'core/images/icons/IconDoubleChevronLeft.svg'
import { color } from 'core/styles/variables'
import { useRef, useState } from 'react'
import { FormProvider } from 'react-hook-form'
import { useAdvertisementHtmlPage } from 'utils/externalAd'
import {
  SellerAdItem,
  SellerDetailCtxProvider,
  useCustomerDetailForm
} from './SellerDetail.utils'
import {
  SDataWrapper,
  SExpandButtonWrapper,
  SForm,
  SIframe,
  SModalContent,
  customerDetailTabStyles
} from './SellerDetailModal.styled'
import { SellerDetailActions } from './actions/SellerDetailActions'
import { useSellerDetailTabs } from './tabs/utils'
import { SellerDetailToolbar } from './toolbar/SellerDetailToolbar'

interface Props {
  data: SellerAdItem
}

export function CustomerDetailModal({ data }: Props) {
  const [openAd, setOpenAd] = useState(false)
  const pageRef = useRef<HTMLIFrameElement>(null)

  const tabs = useSellerDetailTabs()
  const [selectedTab, setSelectedTab] = useState(tabs[0].id)

  useAdvertisementHtmlPage(pageRef, data.adUrl)

  const toggleAdOpen = () => {
    setOpenAd(previousOpen => !previousOpen)
  }

  const form = useCustomerDetailForm(data)

  const { id, seller, state, adNo, downloadedAt } = form.getValues()

  return (
    // TODO! connect to the real calling state when we track the call (later on)
    <SellerDetailCtxProvider>
      <SModalContent openAdvertisement={openAd}>
        <SExpandButtonWrapper variant="row" align="center" justify="center">
          <ButtonTransparent onClick={toggleAdOpen}>
            <IconDoubleChevronLeft
              color={color('night-l-100')}
              css={css`
                rotate: ${openAd ? '-180deg' : 0};
                transition: rotate 350ms;
              `}
            />
          </ButtonTransparent>
        </SExpandButtonWrapper>
        <SDataWrapper>
          <SIframe ref={pageRef} src="about:blank" />
        </SDataWrapper>

        <SDataWrapper withShadow>
          <FormProvider {...form}>
            <SForm>
              <div>
                <SellerDetailToolbar
                  id={adNo}
                  sellerState={seller.state}
                  downloadedAt={downloadedAt}
                />

                <Spacer size={8} axis="vertical" />

                <Tabs
                  tabs={tabs}
                  tabStyles={customerDetailTabStyles}
                  selectedTabId={selectedTab}
                  setSelectedTab={setSelectedTab}
                />

                <Spacer size={4} axis="vertical" />
              </div>

              <SellerDetailActions
                tickingAdId={id}
                phase={state.phase}
                lossReason={state.lossReason}
                sellerId={seller.id}
                sellerState={seller.state}
                resetSellerDetailForm={form.reset}
                setSelectedTab={setSelectedTab}
              />
            </SForm>
          </FormProvider>
        </SDataWrapper>
      </SModalContent>
    </SellerDetailCtxProvider>
  )
}
