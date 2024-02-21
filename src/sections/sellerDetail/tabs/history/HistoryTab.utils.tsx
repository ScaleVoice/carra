import { css } from '@emotion/react'
import { createColumnHelper } from '@tanstack/table-core'
import { Tag } from 'components/tag/Tag'
import { TextBody, TextBodyMedium } from 'components/text/Text'
import { paths } from 'core/api/generated/ticking'
import { size } from 'core/styles/spacing'
import { useTranslation } from 'next-i18next'
import { useCallback, useMemo } from 'react'
import { SellerAdItem } from 'sections/sellerDetail/SellerDetail.utils'
import { formatCurrency } from 'utils/currency'

type StatePhase =
  paths['/ticking/ticking-app/ticking-ads/search']['post']['responses']['200']['content']['application/com.driverama-v1+json']['content'][number]['state']['phase']

const { accessor } = createColumnHelper<SellerAdItem & { carName: string }>()

function usePhaseTagUtils() {
  const { t } = useTranslation()

  const getPhaseTagVariant = (statePhase: StatePhase) => {
    switch (statePhase) {
      case 'LOST':
        return 'warning-secondary'
      default:
        return 'tertiary'
    }
  }

  const getPhaseTagLabel = useCallback(
    (statePhase: StatePhase) => {
      switch (statePhase) {
        case 'APPOINTMENT_CREATED':
          return t('ad_phase_state_appointment_created')
        case 'BOUGHT':
          return t('ad_phase_state_appointment_bought')
        case 'DUPLICATE':
          return t('ad_phase_state_appointment_duplicate')
        case 'NEW_AD':
          return t('ad_phase_state_appointment_new_ad')
        case 'LOST':
          return t('ad_phase_state_appointment_lost')
        case 'TICKED':
          return t('ad_phase_state_appointment_ticked')
        default:
          'State phase not handled'
      }
    },
    [t]
  )

  return { getPhaseTagLabel, getPhaseTagVariant }
}

export const useHistoryTabColumns = () => {
  const { getPhaseTagVariant, getPhaseTagLabel } = usePhaseTagUtils()

  return useMemo(
    () => [
      accessor('carName', {
        header: () => null,
        cell: props => <TextBody size="small">{props.getValue()}</TextBody>,
        size: 220
      }),
      accessor('state', {
        header: () => null,
        cell: props => {
          const state = props.getValue()

          return (
            <Tag variant={getPhaseTagVariant(state.phase)}>
              {getPhaseTagLabel(state.phase)}
            </Tag>
          )
        }
      }),
      accessor('expectedPrice', {
        header: () => null,
        cell: props => {
          const price = props.getValue()

          return price ? (
            <TextBodyMedium
              size="small"
              color="black"
              css={css`
                width: 100%;
                text-align: right;
                padding-right: ${size(2)};
              `}
            >
              {formatCurrency(price)}
            </TextBodyMedium>
          ) : (
            '-'
          )
        },
        size: 80
      })
    ],
    [getPhaseTagVariant, getPhaseTagLabel]
  )
}
