import { CallResultBody, SellerState } from 'core/api/sellerDetail/actions'
import { Dispatch, SetStateAction } from 'react'
import { UseFormReset } from 'react-hook-form'
import { SellerAdItem } from '../SellerDetail.utils'
import { SellerDetailTabKey } from '../tabs/utils'

export interface SellerDetailActionsProps extends CallResultBody {
  tickingAdId: string
  sellerId: string
  sellerState?: SellerState
  resetSellerDetailForm: UseFormReset<SellerAdItem>
  setSelectedTab: Dispatch<SetStateAction<SellerDetailTabKey>>
}
