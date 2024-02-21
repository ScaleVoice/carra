import { css } from '@emotion/react'
import { Flex } from 'components/Flex'
import { FormControl } from 'components/form/formControl/FormControl'
import { defaultFormatter } from 'components/inputNumber/InputNumber.utils'
import { InputNumberControlled } from 'components/inputNumber/InputNumberControlled'
import { Select } from 'components/select/Select'
import { Spacer } from 'components/spacer/Spacer'
import { TextHeader } from 'components/text/Text'
import { useFuelTypeList } from 'core/api/lov/lovFuelTypes'
import { sortMakes, useMakeList } from 'core/api/lov/lovMakes'
import { useModelList } from 'core/api/lov/lovModelsSearch'
import { size } from 'core/styles/spacing'
import { useTranslation } from 'next-i18next'
import { useContext } from 'react'
import { TickingItem } from 'sections/tickingList/table/TickingListTable.utils'
import { nameOf } from 'utils/types'
import { CarDetailStateCtx, useCarDetailFormCtx } from '../../CarDetail.utils'
import { SCarFormWrapper } from './CarTab.styled'

export function CarTab() {
  const { t } = useTranslation()
  const form = useCarDetailFormCtx()
  const { readOnly } = useContext(CarDetailStateCtx)

  const make = form.watch('makeId')

  const { carMakes } = useMakeList()
  const { models } = useModelList(make ? [make] : undefined)
  const { fuelTypes } = useFuelTypeList()

  const carMakeOptions = carMakes
    .map(make => ({
      value: make.id,
      label: make.name ?? make.id
    }))
    .sort(sortMakes)

  const carModelOptions = models.map(model => ({
    value: model.id,
    label: model.name ?? model.id
  }))

  return (
    <Flex variant="column">
      <Flex
        variant="row"
        justify="between"
        css={css`
          height: ${size(8)};
        `}
      >
        <TextHeader variant="h6" as="h6">
          {t('car_detail_tabs_car')}
        </TextHeader>
      </Flex>

      <Spacer size={4} axis="vertical" />

      <SCarFormWrapper>
        <Flex variant="column" gap={4}>
          <Select
            label={t('car_detail_make')}
            name={nameOf<TickingItem>('makeId')}
            options={carMakeOptions}
            emptyLabel={t('select_make_empty_label')}
            onChange={() => {
              //when changing make, we need to reset model
              form.setValue('modelId', undefined)
            }}
            disabledMode="solid"
            disabled={readOnly}
          />

          <FormControl label={t('car_detail_year')}>
            <input
              type="text"
              {...form.register('yearOfMake', {
                valueAsNumber: true,
                min: 1900,
                max: new Date().getFullYear()
              })}
              disabled={readOnly}
            />
          </FormControl>

          <InputNumberControlled
            min={0}
            label={t('car_detail_mileage')}
            name={nameOf<TickingItem>('speedometerMileageKm')}
            css={{
              flex: 1
            }}
            currency="km"
            currencyPosition="right"
            inputDisabled={readOnly}
            formatter={defaultFormatter}
          />
        </Flex>

        <Flex variant="column" gap={4}>
          <Select
            label={t('car_detail_model')}
            name={nameOf<TickingItem>('modelId')}
            options={carModelOptions}
            emptyLabel={t('select_model_empty_label')}
            disabledMode="solid"
            disabled={readOnly || !make}
          />

          <Select
            label={t('car_detail_fuel_type')}
            name={nameOf<TickingItem>('fuelId')}
            options={fuelTypes}
            emptyLabel={t('select_fuel_type_empty_label')}
            disabledMode="solid"
            disabled={readOnly}
          />
        </Flex>
      </SCarFormWrapper>
    </Flex>
  )
}
