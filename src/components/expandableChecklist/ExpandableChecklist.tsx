import { CheckboxIcon } from 'components/checkboxIcon/CheckboxIcon'
import { Spacer } from 'components/spacer/Spacer'
import { useState } from 'react'
import {
  SHeader,
  SHeaderItem,
  SHeaderItemLabel,
  SIcon,
  SItems
} from './ExpandableChecklist.styled'

interface Option<T> {
  value: T
  label: string
}

interface Props<T> {
  options: Option<T>[]
  value: T[]
  onChange: (value: T) => void
}

export function ExpandableChecklist<T>({ options, value, onChange }: Props<T>) {
  const [isExpanded, setIsExpanded] = useState(false)

  const isActive = (option: Option<T>) => value.includes(option.value)

  return (
    <div>
      {options.length > 0 && (
        <SHeader optionsLength={options.length}>
          <SHeaderItem
            isActive={isActive(options[0])}
            onClick={() => onChange(options[0].value)}
          >
            <SHeaderItemLabel>{options[0].label}</SHeaderItemLabel>
          </SHeaderItem>
          {options.length > 1 && (
            <SHeaderItem
              isActive={isActive(options[1])}
              onClick={() => onChange(options[1].value)}
            >
              <SHeaderItemLabel>{options[1].label}</SHeaderItemLabel>
            </SHeaderItem>
          )}
          {options.length > 2 && (
            <SHeaderItem
              aria-label="expand"
              onClick={() => setIsExpanded(prev => !prev)}
              isActive={isExpanded}
            >
              <SIcon />
            </SHeaderItem>
          )}
        </SHeader>
      )}
      {isExpanded && (
        <>
          <Spacer axis="vertical" size={2} />
          <SItems length={options.length}>
            {options.slice(2).map((option, i) => (
              <CheckboxIcon
                key={i}
                label={option.label}
                isActive={isActive(option)}
                onClick={() => onChange(option.value)}
              />
            ))}
          </SItems>
        </>
      )}
    </div>
  )
}
