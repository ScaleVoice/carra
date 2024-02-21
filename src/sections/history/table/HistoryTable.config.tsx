import { css } from '@emotion/react'
import { createColumnHelper } from '@tanstack/react-table'
import { Flex } from 'components/Flex'
import { useSortableColumns } from 'components/table/sort/SortableColumn'
import { TextBody, TextBodyMedium } from 'components/text/Text'
import { useBodiesSearchList } from 'core/api/lov/lovBodiesSearch'
import { useFuelTypeList } from 'core/api/lov/lovFuelTypes'
import { useMakeList } from 'core/api/lov/lovMakes'
import { useLovModelsSearchQuery } from 'core/api/lov/lovModelsSearch'
import IconCheck from 'core/images/icons/IconCheck.svg'
import IconCross from 'core/images/icons/IconCross.svg'
import { color } from 'core/styles/variables'
import { format } from 'date-fns'
import { useTranslation } from 'next-i18next'
import { formatCurrency } from 'utils/currency'
import { parseUTCDate } from 'utils/date'
import { isNil, isNotNil } from 'utils/types'
import { HistoryItem } from './HistoryTable.utils'
import { serverOptions } from 'components/filters/serverId/ServerFilter'

export const useHistoryTableColumns = () => {
  const { t } = useTranslation(['history', 'common'])

  const { createSortableColumn } = useSortableColumns<HistoryItem>('history')
  const columnHelper = createColumnHelper<HistoryItem>()

  const makeQuery = useMakeList()
  const modelQuery = useLovModelsSearchQuery()
  const bodyQuery = useBodiesSearchList()
  const fuelTypeQuery = useFuelTypeList()

  const lovsLoading = [makeQuery, modelQuery, bodyQuery, fuelTypeQuery].some(
    query => query.isLoading
  )

  const columns = [
    createSortableColumn('adNo', {
      label: t('history:table_column_id'),
      cell: props => <TextBody size="small">{props.getValue()}</TextBody>,
      size: 110,
      minSize: 110
    }),
    createSortableColumn('carGrade', {
      label: t('history:table_column_car_grade'),
      cell: props => <TextBody size="small">{props.getValue()}</TextBody>,
      size: 80
    }),
    createSortableColumn('makeId', {
      label: t('history:table_column_make'),
      cell: props => {
        const makeId = props.getValue()

        const makeLabel = makeQuery.carMakes.find(
          make => make.id === makeId
        )?.name

        return (
          <TextBody size="small">{makeLabel ?? t('common:nil_value')}</TextBody>
        )
      }
    }),
    createSortableColumn('modelId', {
      label: t('history:table_column_model'),
      cell: props => {
        const modelId = props.getValue()

        const modelLabel = modelQuery.data?.content.find(
          model => model.id === modelId
        )?.name

        return (
          <TextBody size="small">
            {modelLabel ?? t('common:nil_value')}
          </TextBody>
        )
      }
    }),
    createSortableColumn('yearOfMake', {
      label: t('history:table_column_year_of_make'),
      cell: props => {
        const year = props.getValue()

        return (
          <TextBody size="small">
            {year ? year : t('common:nil_value')}
          </TextBody>
        )
      },
      size: 100
    }),
    createSortableColumn('speedometerMileageKm', {
      label: t('history:table_column_mileage'),
      cell: props => {
        const mileage = props.getValue()

        return (
          <TextBody size="small">
            {isNotNil(mileage)
              ? t('common:km_format', { km: mileage })
              : t('common:nil_value')}
          </TextBody>
        )
      },
      size: 120
    }),
    createSortableColumn('expectedPrice', {
      label: t('history:table_column_price'),
      cell: props => {
        const price = props.getValue()

        return (
          <TextBody size="small">
            {price ? formatCurrency(price) : t('nil_value')}
          </TextBody>
        )
      },
      size: 120
    }),
    createSortableColumn('fuelId', {
      label: t('history:table_column_fuel_type'),
      cell: props => {
        const fuelId = props.getValue()

        const fuelLabel = fuelTypeQuery.fuelTypes.find(
          fuelType => fuelType.value === fuelId
        )?.label

        return (
          <TextBody size="small">{fuelLabel ?? t('common:nil_value')}</TextBody>
        )
      },
      size: 80
    }),
    createSortableColumn('bodyId', {
      label: t('history:table_column_body'),
      cell: props => {
        const bodyId = props.getValue()

        const bodyLabel = bodyQuery.bodies.find(
          body => body.value === bodyId
        )?.label

        return (
          <TextBody size="small">{bodyLabel ?? t('common:nil_value')}</TextBody>
        )
      },
      size: 120
    }),
    columnHelper.accessor('seller.name', {
      header: () => (
        <TextBodyMedium size="small" color="night-l-100">
          {t('history:table_column_seller_name')}
        </TextBodyMedium>
      ),
      cell: props => (
        <TextBody size="small">
          {props.getValue() ?? t('common:nil_value')}
        </TextBody>
      ),
      minSize: 200
    }),
    createSortableColumn('transmissionId', {
      label: t('history:table_column_transmission'),
      cell: props => {
        const value = props.getValue()

        const Icon =
          value === 'A' ? (
            <IconCheck
              css={css`
                color: ${color('night-l-200')};
              `}
            />
          ) : (
            <IconCross
              css={css`
                color: ${color('warning')};
              `}
            />
          )

        return (
          <Flex variant="row" align="center">
            {Icon}
          </Flex>
        )
      },
      size: 100
    }),
    columnHelper.accessor('state.action', {
      header: () => (
        <TextBodyMedium size="small" color="night-l-100">
          {t('history:table_column_reaction')}
        </TextBodyMedium>
      ),
      cell: props => {
        const reaction = props.getValue()

        return (
          <TextBody size="small">
            {reaction
              ? t(`history:history_reaction_${reaction}`)
              : t('common:nil_value')}
          </TextBody>
        )
      }
    }),
    createSortableColumn('rank', {
      label: t('history:table_column_rank'),
      cell: props => {
        return (
          <TextBody size="small">
            {props.row.original.rank ?? t('common:nil_value')}
          </TextBody>
        )
      }
    }),
    createSortableColumn('profit', {
      label: t('history:table_column_profit'),
      cell: props => {
        const profit = props.row.original.profit

        return (
          <TextBody size="small">
            {profit ? formatCurrency(profit) : t('common:nil_value')}
          </TextBody>
        )
      }
    }),
    createSortableColumn('seller.type', {
      label: t('history:table_column_private'),
      cell: props => {
        const seller = props.getValue()

        if (isNil(seller)) {
          return <TextBody size="small">{t('common:nil_value')}</TextBody>
        }

        const Icon =
          seller === 'PERSON' ? (
            <IconCheck
              css={css`
                color: ${color('night-l-200')};
              `}
            />
          ) : (
            <IconCross
              css={css`
                color: ${color('warning')};
              `}
            />
          )

        return <TextBody size="small">{Icon}</TextBody>
      },
      size: 90
    }),
    createSortableColumn('serverId', {
      label: t('history:table_column_server_id'),
      cell: props => {
        const serverLabelById =
          serverOptions.find(
            serverOption => serverOption.value === props.getValue()?.toString()
          )?.label ?? t('common:nil_value')

        return <TextBody size="small">{serverLabelById}</TextBody>
      },
      size: 130
    }),
    createSortableColumn('downloadedAt', {
      label: t('history:table_column_downloaded_at'),
      cell: props => {
        const value = props.row.original.downloadedAt

        const downloadedAt = value
          ? format(parseUTCDate(value), 'dd.MM.yyyy HH:mm')
          : t('common:nil_value')

        return <TextBody size="small">{downloadedAt}</TextBody>
      }
    })
  ]

  return { columns, lovsLoading }
}
