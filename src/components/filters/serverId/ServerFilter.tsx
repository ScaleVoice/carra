import { Flex } from 'components/Flex'
import { TextBody } from 'components/text/Text'
import { useMemo } from 'react'
import { FilterSelect } from '../general/select/FilterSelect'

export const serverOptions = [
  {
    value: '198',
    label: 'cars.co.za'
  },
  {
    value: '199',
    label: 'autotrader.co.za'
  }
]

interface Props {
  label: string
  selectedServers?: number[]
  onServersChange: (servers: number[]) => void
  disabled?: boolean
}

export function ServerFilter({
  label,
  selectedServers,
  onServersChange,
  disabled
}: Props) {
  const value = useMemo(
    () =>
      serverOptions.filter(({ value }) =>
        selectedServers?.includes(parseFloat(value))
      ),
    [selectedServers]
  )

  return (
    <Flex variant="column" gap={1}>
      <TextBody>{label}</TextBody>
      <FilterSelect
        id="serverId"
        multiSelect
        options={serverOptions}
        value={value}
        label={label}
        onChange={newValue =>
          onServersChange(newValue.map(({ value }) => parseInt(value)))
        }
        disabled={disabled}
      />
    </Flex>
  )
}
