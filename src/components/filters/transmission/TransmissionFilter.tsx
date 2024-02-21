import { Flex } from 'components/Flex'
import { InputSwitch } from 'components/inputSwitch/InputSwitch'
import { TextBody } from 'components/text/Text'
import {
  getShortenTransmissionLabels,
  useTransmissionList
} from 'core/api/lov/lovTransmissions'
import { useMemo } from 'react'

interface Props {
  label: string
  selectedTransmissionId?: string
  onTransmissionsChange: (id?: string) => void
}

export function TransmissionFilter({
  label,
  selectedTransmissionId,
  onTransmissionsChange
}: Props) {
  const { transmissions } = useTransmissionList()

  const shortenOptions = useMemo(
    () =>
      transmissions.map(({ value, label }) => ({
        value,
        label: getShortenTransmissionLabels(value, label)
      })),
    [transmissions]
  )

  const handleTransmissionChange = (id?: string) => {
    if (selectedTransmissionId === id) {
      onTransmissionsChange(undefined)

      return
    }

    onTransmissionsChange(id)
  }

  return (
    <Flex variant="column" gap={1}>
      <TextBody>{label}</TextBody>
      <InputSwitch
        options={shortenOptions}
        value={selectedTransmissionId}
        onChange={handleTransmissionChange}
      />
    </Flex>
  )
}
