import { Flex } from 'components/Flex'
import { TextBody } from 'components/text/Text'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { TickingFilters } from 'sections/filtering/reducer/Filters.utils'
import { FilterSelect } from '../general/select/FilterSelect'

type Reactions = NonNullable<TickingFilters['stateActions']>
type ReactionOption = {
  value: Reactions[number]
  label: string
}

const useReactionOptions = (): ReactionOption[] => {
  const { t } = useTranslation()

  return useMemo(
    () => [
      {
        value: 'SMS_ONLY',
        label: t('car_detail_actions_sms_only')
      },
      { value: 'CALL', label: t('car_detail_actions_call_yes') },
      { value: 'HOT_DEAL', label: t('car_detail_actions_hot_deal') },
      { value: 'NOT_INTERESTED', label: t('car_detail_actions_not_interested') }
    ],
    [t]
  )
}

interface Props {
  label: string
  selectedStates?: Reactions
  onStatesChange: (states: Reactions) => void
}

export function ReactionFilter({
  label,
  selectedStates,
  onStatesChange
}: Props) {
  const options = useReactionOptions()

  const value = useMemo(
    () => options.filter(({ value }) => selectedStates?.includes(value)),
    [selectedStates, options]
  )
  return (
    <Flex variant="column" gap={1}>
      <TextBody>{label}</TextBody>
      <FilterSelect
        id="reactions"
        multiSelect
        options={options}
        value={value}
        label={label}
        onChange={newValue =>
          onStatesChange(newValue.map(({ value }) => value))
        }
      />
    </Flex>
  )
}
