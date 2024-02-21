import { useModal } from 'components/modal/Modal'
import { useTranslation } from 'next-i18next'
import { createContext, useState } from 'react'
import { useForm, useFormContext } from 'react-hook-form'
import { TickingItem } from '../tickingList/table/TickingListTable.utils'
import { CarDetailModal } from './CarDetailModal'
import {
  carDetailModalBackgroundStyles,
  carDetailModalWrapperStyles
} from './CarDetailModal.styled'

export interface CarDetail {
  domain: string
  country: string
  ad_url: string
  make: string
  model: string
  year: number
  engine_power?: number
  fuel_type?: string
  mileage?: number
  cubic_capacity?: number
  customer_phone: string
  customer_seller?: string
  customer_type: string
  expected_price: number
  recommended_buying_price: number
  max_recommended_price?: number
  new_retail_price?: number
  new_trade_price?: number
  grade: number
  st?: number
  wp?: number
  l_plan?: string
  leasing?: string
  note?: string
  cz?: string
  sk?: string
  pl?: string
  de?: string
}

export function useCarDetailModal(historyModal?: boolean) {
  const { t } = useTranslation()

  const [selectedRow, setSelectedRow] = useState<TickingItem>()

  const [modal, openModal] = useModal(
    () =>
      selectedRow && (
        <CarDetailModal data={selectedRow} historyModal={historyModal} />
      ),
    {
      closeLabel: t('close'),
      backgroundStyles: carDetailModalBackgroundStyles,
      wrapperStyles: carDetailModalWrapperStyles,
      animation: 'slide-in-right',
      hideCross: true
    }
  )

  const handleOpenModal = (row: TickingItem) => {
    setSelectedRow(row)

    openModal()
  }

  return [modal, handleOpenModal] as const
}

export function useCarDetailForm(data: TickingItem) {
  return useForm<TickingItem>({
    defaultValues: {
      ...data,
      seller: {
        ...data.seller,
        name: data.seller?.name?.toUpperCase()
      }
    }
  })
}

export function useCarDetailFormCtx() {
  return useFormContext<TickingItem>()
}

export const CarDetailStateCtx = createContext({
  readOnly: false
})
