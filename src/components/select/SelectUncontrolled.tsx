import { css } from '@emotion/react'
import { FormControl } from 'components/form/formControl/FormControl'
import { Spinner } from 'components/spinner/Spinner'
import IconSelectDropdown from 'core/images/icons/IconSelectDropdown.svg'
import { size } from 'core/styles/spacing'
import { color, time } from 'core/styles/variables'
import { useUIDSeed } from 'react-uid'
import { SelectProps } from './Select'

export function SelectUncontrolled(
  props: SelectProps & {
    onInnerChange?: (newValue: string | undefined) => void
    value?: string
    disabledMode?: 'solid'
  }
) {
  const { onInnerChange, value } = props
  const seed = useUIDSeed()

  return (
    <FormControl
      hint={props.hint}
      label={props.label}
      error={props.error}
      isDisabled={props.disabled}
      isReadOnly={props.readOnly}
      isRequired={props.isRequired}
      variant={props.variant}
      disabledMode={props.disabledMode}
      css={css`
        &:focus-within svg {
          transform: rotate(180deg);
        }
      `}
    >
      {props.isLoading ? (
        <Spinner
          css={css`
            width: ${size(6)};
            height: ${size(6)};
            border-width: 2px;
            position: absolute;
            top: 30%;
            right: ${size(4)};
          `}
        />
      ) : (
        <IconSelectDropdown
          css={css`
            transition: all ${time('control')} ease;

            position: absolute;
            right: ${size(3)};
            top: ${size(4)};

            pointer-events: none;

            display: ${props.readOnly && 'none'};
          `}
        />
      )}

      <select
        id={seed(props.name)}
        name={props.name}
        onBlur={({ target }) => {
          onInnerChange?.(target.value || undefined)
          props.onBlur?.()
        }}
        onFocus={props.onFocus}
        disabled={props.disabled || props.readOnly}
        value={value ?? undefined}
        onChange={({ target }) => {
          onInnerChange?.(target.value || undefined)
          props.onChange?.(target.value)
        }}
        css={css`
          color: ${!value ? color('night-text') : 'initial'};
          opacity: ${props.readOnly ? '1' : 'initial'};
        `}
        className={props.className}
      >
        {props.emptyLabel && (
          <option css={css({ color: color('night-text') })} value={''}>
            {props.emptyLabel}
          </option>
        )}

        {props.options.map((option, key) => (
          <option
            value={option.value}
            key={key}
            css={css({ color: color('night-d-200') })}
          >
            {option.label}
          </option>
        ))}

        {props.extraOptions?.map((option, key) => (
          <option
            value={option.value}
            key={key}
            css={css({ color: color('night-d-200') })}
          >
            {option.label}
          </option>
        ))}
      </select>
    </FormControl>
  )
}
