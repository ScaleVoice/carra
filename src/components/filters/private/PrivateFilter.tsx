import { Flex } from 'components/Flex'
import { InputSwitch } from 'components/inputSwitch/InputSwitch'
import { TextBody } from 'components/text/Text'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { TickingFilters } from 'sections/filtering/reducer/Filters.utils'

type SellerType = NonNullable<TickingFilters['sellerTypes']>[number]
type PrivateFilterOption = {
  value: SellerType
  label: string
}

interface Props {
  label: string
  selected?: SellerType
  onChange: (seller?: SellerType) => void
}

const usePrivateFilterOptions = (): PrivateFilterOption[] => {
  const { t } = useTranslation()

  console.log('t', t, t('yes'))

  return useMemo(
    () => [
      {
        value: 'PERSON',
        label: t('yes')
      },
      {
        value: 'COMPANY',
        label: t('no')
      }
    ],
    [t]
  )
}

export function PrivateFilter({ label, selected, onChange }: Props) {
  const options = usePrivateFilterOptions()

  const handleChange = (state?: SellerType) => {
    if (selected === state) {
      onChange(undefined)

      return
    }

    onChange(state)
  }

  return (
    <Flex variant="column" gap={1}>
      <TextBody>{label}</TextBody>
      <InputSwitch options={options} value={selected} onChange={handleChange} />
    </Flex>
  )
}
