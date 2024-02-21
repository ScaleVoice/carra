import { css } from '@emotion/react'
import { ButtonTransparent } from 'components/button/Button'
import { Spacer } from 'components/spacer/Spacer'
import { Tabs } from 'components/tabs/Tabs'
import { useCarDetailMutation } from 'core/api/carDetail/edit'
import IconDoubleChevronLeft from 'core/images/icons/IconDoubleChevronLeft.svg'
import { color } from 'core/styles/variables'
import equal from 'fast-deep-equal'
import { useTranslation } from 'next-i18next'
import { useRef, useState } from 'react'
import { FormProvider } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useAdvertisementHtmlPage } from 'utils/externalAd'
import { TickingItem } from '../tickingList/table/TickingListTable.utils'
import { CarDetailStateCtx, useCarDetailForm } from './CarDetail.utils'
import {
  SDataWrapper,
  SExpandButtonWrapper,
  SForm,
  SIframe,
  SModalContent,
  carDetailTabStyles
} from './CarDetailModal.styled'
import { CarDetailActions } from './actions/CarDetailActions'
import { useCarDetailTabs } from './tabs/utils'
import { CarDetailToolbar } from './toolbar/CarDetailToolbar'

interface Props {
  data: TickingItem
  historyModal?: boolean
}

export function CarDetailModal({ data, historyModal = false }: Props) {
  const { t } = useTranslation()
  const [openAd, setOpenAd] = useState(false)
  const pageRef = useRef<HTMLIFrameElement>(null)
  const tabs = useCarDetailTabs()

  const [selectedTab, setSelectedTab] = useState(tabs[0].id)

  useAdvertisementHtmlPage(pageRef, data.adUrl)

  const form = useCarDetailForm(data)

  const toggleAdOpen = () => {
    setOpenAd(previousOpen => !previousOpen)
  }

  const { mutateAsync } = useCarDetailMutation()

  const onSubmit = async (formData: TickingItem) => {
    // if the values did not change, just reset form
    if (equal(data, formData)) {
      form.reset()

      return
    }

    try {
      const res = await mutateAsync({
        ...formData,
        carGrade: Number(formData.carGrade)
      })

      form.reset(res)

      toast.success(t('car_detail_update_success'))
    } catch (e) {
      toast.error(t('car_detail_update_error'))
    }
  }

  return (
    <CarDetailStateCtx.Provider value={{ readOnly: historyModal }}>
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
            <SForm onSubmit={form.handleSubmit(onSubmit)}>
              <div>
                <CarDetailToolbar
                  id={data.adNo}
                  downloadedAt={data.downloadedAt}
                  pricingAppUrl={data.pricingAppUrl}
                />

                <Spacer size={4} axis="vertical" />

                <Tabs
                  tabs={tabs}
                  tabStyles={carDetailTabStyles}
                  selectedTabId={selectedTab}
                  setSelectedTab={setSelectedTab}
                />

                <Spacer size={4} axis="vertical" />
              </div>

              <CarDetailActions />
            </SForm>
          </FormProvider>
        </SDataWrapper>
      </SModalContent>
    </CarDetailStateCtx.Provider>
  )
}
