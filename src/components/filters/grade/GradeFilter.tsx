import { Flex } from 'components/Flex'
import { TextBody } from 'components/text/Text'
import { useMemo } from 'react'
import { FilterSelect } from '../general/select/FilterSelect'

interface Props {
  label: string
  selectedGrades?: number[]
  onGradesChange: (grades: number[]) => void
  disabled?: boolean
}

const gradeOptions = ['1', '2', '3', '4', '5'].map(grade => ({
  value: grade,
  label: grade
}))

export function GradesFilter({
  label,
  selectedGrades,
  onGradesChange,
  disabled
}: Props) {
  const value = useMemo(
    () =>
      gradeOptions.filter(({ value }) =>
        selectedGrades?.includes(parseFloat(value))
      ),
    [selectedGrades]
  )

  return (
    <Flex variant="column" gap={1}>
      <TextBody>{label}</TextBody>
      <FilterSelect
        id="carGrades"
        multiSelect
        options={gradeOptions}
        value={value}
        label={label}
        onChange={newValue =>
          onGradesChange(newValue.map(({ value }) => parseInt(value)))
        }
        disabled={disabled}
      />
    </Flex>
  )
}
