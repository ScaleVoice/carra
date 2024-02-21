import { RequiredMark } from 'components/requiredMark/RequiredMark'
import { Children, cloneElement, isValidElement, ReactNode } from 'react'
import { useUIDSeed } from 'react-uid'
import { isNotNil } from 'utils/types'
import { SContainer, SError, SFieldset, SHint } from './FormControl.styled'
import { findPropInChildren } from './FormControl.utils'

const INPUT_TAGS = ['input', 'textarea', 'select']

export function FormControl(props: {
  hint?: ReactNode
  error?: ReactNode
  positive?: ReactNode
  label?: string
  children?: ReactNode
  className?: string
  isValid?: boolean
  isDisabled?: boolean
  isReadOnly?: boolean
  isRequired?: boolean
  isMultiSelect?: boolean
  variant?: 'rounded' | 'normal'
  disabledMode?: 'solid'
  isBorderless?: boolean
}) {
  const seed = useUIDSeed()

  const textarea = Children.toArray(props.children).find(
    child => isValidElement(child) && child.type === 'textarea'
  )

  const children = Children.map(props.children, child => {
    if (
      isValidElement(child) &&
      typeof child.type === 'string' &&
      INPUT_TAGS.includes(child.type)
    ) {
      const inputChild = child as React.ReactElement<HTMLInputElement>

      return cloneElement(inputChild, {
        id: child.props.id ?? (child.props.name && seed(child.props.name)),
        placeholder: child.props.placeholder ?? '\xa0',
        disabled: isNotNil(child.props.disabled)
          ? child.props.disabled
          : props.isDisabled,
        readOnly: isNotNil(child.props.readOnly)
          ? child.props.readOnly
          : props.isReadOnly
      })
    }

    return child
  })

  const id = findPropInChildren(children, 'id') ?? undefined

  return (
    <SFieldset className={props.className}>
      <SContainer
        isMultiSelect={props.isMultiSelect}
        label={props.label}
        hasError={!!props.error || props.isValid === false}
        isDisabled={props.isDisabled}
        isReadOnly={props.isReadOnly}
        isTextarea={!!textarea}
        variant={props.variant}
        disabledMode={props.disabledMode}
        isBorderless={props.isBorderless}
      >
        {children}
        {props?.label && (
          <label htmlFor={id}>
            {props.label}
            {props.isRequired && <RequiredMark />}
          </label>
        )}
      </SContainer>

      {props.error && <SError variant="caption">{props.error}</SError>}

      {props.hint && !props.error && (
        <SHint variant="caption">{props.hint}</SHint>
      )}
    </SFieldset>
  )
}
