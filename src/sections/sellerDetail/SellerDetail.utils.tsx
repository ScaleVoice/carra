import {
  UseQueryOptions,
  UseQueryResult,
  useQuery
} from '@tanstack/react-query'
import { useModal } from 'components/modal/Modal'
import { HTTPMethod } from 'constants/httpMethod'
import { QUERY_KEYS } from 'constants/queryKeys'
import { URLS } from 'constants/urls'
import { paths } from 'core/api/generated/ticking'
import { useFuelTypeList } from 'core/api/lov/lovFuelTypes'
import { useMakeList } from 'core/api/lov/lovMakes'
import { useModelList } from 'core/api/lov/lovModelsSearch'
import { useTransmissionList } from 'core/api/lov/lovTransmissions'
import { useTranslation } from 'next-i18next'
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useMemo,
  useState
} from 'react'
import { useForm, useFormContext } from 'react-hook-form'
import { formatEngineCcm } from 'utils/engineCcm'
import { apiFetch } from 'utils/fetch'
import { TickingItem } from '../tickingList/table/TickingListTable.utils'
import { CustomerDetailModal } from './SellerDetailModal'
import {
  carDetailModalBackgroundStyles,
  carDetailModalWrapperStyles
} from './SellerDetailModal.styled'
import { mockTickingAdSearchResponse } from 'mocks/ticking'

type SellerAdsReponse =
  paths['/ticking/ticking-app/ticking-ads/search']['post']['responses']['200']['content']['application/com.driverama-v1+json']

export type SellerAdItem = SellerAdsReponse['content'][number]

export function useCustomerDetailModal() {
  const { t } = useTranslation()

  const [selectedRow, setSelectedRow] = useState<TickingItem>()

  const [modal, openModal] = useModal(
    () => selectedRow && <CustomerDetailModal data={selectedRow} />,
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

export function useCustomerDetailForm(data: TickingItem) {
  return useForm<TickingItem>({
    defaultValues: data
  })
}

export function useSellerDetailFormCtx() {
  return useFormContext<TickingItem>()
}

interface SellerCtx {
  isCalling: boolean
  setIsCalling: Dispatch<SetStateAction<boolean>>
}

export const SellerDetailCtx = createContext<SellerCtx>({
  isCalling: false,
  setIsCalling: () => {}
})

export function SellerDetailCtxProvider({ children }: { children: ReactNode }) {
  const [isCalling, setIsCalling] = useState(false)

  return (
    <SellerDetailCtx.Provider
      value={{
        isCalling,
        setIsCalling
      }}
    >
      {children}
    </SellerDetailCtx.Provider>
  )
}

type Options = UseQueryOptions<SellerAdsReponse>
type SellerAdsSearchBody = Omit<
  paths['/ticking/ticking-app/ticking-ads/search']['post']['requestBody']['content']['application/json'],
  'sellerIds'
>

async function fetchSellerAds(
  sellerId: string,
  body: SellerAdsSearchBody,
  page: number
): Promise<SellerAdsReponse> {
  // const response = await apiFetch(URLS.tickingAdsSearch, {
  //   method: HTTPMethod.POST,
  //   body: {
  //     sellerIds: [sellerId],
  //     ...body
  //   },
  //   searchParams: {
  //     page: page - 1,
  //     sort: 'downloadedAt,desc',
  //     size: 20
  //   }
  // })

  // return response.json()

  return mockTickingAdSearchResponse
}

export function useSellerAdsQuery(
  sellerId: string,
  // TODO! after filters are implemented on BE change this to correct type
  body: Record<string, unknown>,
  page: number,
  opts?: Options
) {
  return useQuery({
    queryFn: async () => await fetchSellerAds(sellerId, body, page),
    keepPreviousData: true,
    staleTime: Infinity,
    ...opts
  })
}

export function useMappedSellerData(query: UseQueryResult<SellerAdsReponse>) {
  const { t } = useTranslation()
  const queryLoading = query.isFetching && query.isInitialLoading
  const enabled = !!query.data?.content.length && !queryLoading

  const makesQuery = useMakeList(undefined, enabled)
  const modelsQuery = useModelList(undefined, enabled)
  const transmissionsQuery = useTransmissionList({
    enabled,
    staleTime: Infinity
  })
  const fuelTypesQuery = useFuelTypeList({ enabled, staleTime: Infinity })

  const queries = [modelsQuery, makesQuery, transmissionsQuery, fuelTypesQuery]

  const loading = queries.some(q => q.isLoading) || queryLoading

  const mappedData = useMemo(
    () =>
      (query.data?.content ?? []).map(ad => {
        const make =
          makesQuery.carMakes.find(make => make.id === ad.makeId)?.name ??
          t('nil_value')
        const model =
          modelsQuery.models.find(model => model.id === ad.modelId)?.name ??
          t('nil_value')
        const transmission =
          transmissionsQuery.transmissions.find(
            transmission => transmission.value === ad.transmissionId
          )?.label ?? t('nil_value')
        const fuel =
          fuelTypesQuery.fuelTypes.find(
            fuelType => fuelType.value === ad.fuelId
          )?.label ?? t('nil_value')

        const engine = `${formatEngineCcm(ad.volumeCcm, t('nil_value'))} ${
          ad.powerKw ? `${ad.powerKw}kW` : t('nil_value')
        }`

        const carName = `${make} ${model} ${engine} ${transmission} ${fuel}`

        return {
          ...ad,
          carName
        }
      }),
    [
      t,
      makesQuery.carMakes,
      query.data?.content,
      fuelTypesQuery.fuelTypes,
      modelsQuery.models,
      transmissionsQuery.transmissions
    ]
  )

  return { mappedData, loading }
}

export function useSellerCurrentAds(sellerId: string) {
  const [page, setPage] = useState(1)

  const currentAdsQuery = useSellerAdsQuery(
    sellerId,
    { statePhases: ['NEW_AD', 'TICKED'] },
    page,
    { queryKey: QUERY_KEYS.sellerCurrentAds({ sellerId, page }) }
  )

  const mappedData = useMappedSellerData(currentAdsQuery)

  return {
    ...mappedData,
    page,
    setPage,
    totalPages: currentAdsQuery.data?.totalPages ?? 0
  }
}

export function useSellerHistoryAds(sellerId: string) {
  const [page, setPage] = useState(1)

  const historyAdsQuery = useSellerAdsQuery(
    sellerId,
    { excludeStatePhases: ['NEW_AD', 'TICKED'] },
    page,
    { queryKey: QUERY_KEYS.sellerHistoricalAds({ sellerId, page }) }
  )

  const mappedData = useMappedSellerData(historyAdsQuery)

  return {
    ...mappedData,
    page,
    setPage,
    totalPages: historyAdsQuery.data?.totalPages ?? 0
  }
}
