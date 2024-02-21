import { useTranslation } from 'next-i18next'
import { useCallback } from 'react'

export type BodyTypeName =
  | 'H'
  | 'S'
  | 'C'
  | 'SUV'
  | 'OFF'
  | 'VAN'
  | 'BV'
  | 'CPE'
  | 'CAB'
  | 'OTHER'

export const bodyTypes: { ids: string[]; name: BodyTypeName }[] = [
  { ids: ['H'], name: 'H' },
  { ids: ['S'], name: 'S' },
  { ids: ['C'], name: 'C' },
  { ids: ['SUV'], name: 'SUV' },
  { ids: ['OFF'], name: 'OFF' },
  { ids: ['MPV', 'C-MPV', 'B'], name: 'VAN' },
  { ids: ['VAN', 'P'], name: 'BV' },
  { ids: ['CPE'], name: 'CPE' },
  { ids: ['CAB'], name: 'CAB' },
  { ids: ['TC', 'FR', 'VA', 'BV', 'TIP'], name: 'OTHER' }
]

export const useGetBodyTypeLabel = () => {
  const { t } = useTranslation()
  const getLabel = useCallback(
    (name: BodyTypeName) => {
      switch (name) {
        case 'H':
          return t('body_type_h')
        case 'S':
          return t('body_type_s')
        case 'C':
          return t('body_type_c')
        case 'SUV':
          return t('body_type_suv')
        case 'OFF':
          return t('body_type_off')
        case 'VAN':
          return t('body_type_van')
        case 'BV':
          return t('body_type_bv')
        case 'CPE':
          return t('body_type_cpe')
        case 'CAB':
          return t('body_type_cab')
        case 'OTHER':
          return t('body_type_other')
        default:
          return ''
      }
    },
    [t]
  )

  return {
    getLabel
  }
}
