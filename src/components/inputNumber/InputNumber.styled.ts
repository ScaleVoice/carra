import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { FormControl } from 'components/form/formControl/FormControl'
import { size } from 'core/styles/spacing'
import { color } from 'core/styles/variables'

export const SFormControl = styled(FormControl)<{
  hasCurrency: boolean
  currencyPosition: 'right' | 'left'
  hasLabel: boolean
}>`
  ${({ hasCurrency, currencyPosition }) =>
    hasCurrency &&
    css`
      input:not(:placeholder-shown) {
        padding-${currencyPosition}: ${size(8)} !important;
      }

      input:not(:placeholder-shown) ~ ${SCurrency} {
        bottom: 9px;
        opacity: 1;
      }
    `}
  ${({ hasLabel }) =>
    !hasLabel &&
    css`
      input:not(:placeholder-shown) ~ ${SCurrency} {
        top: 50%;
        transform: translateY(-50%);
        opacity: 1;
      }
    `}
`

export const SCurrency = styled.span<{ align: 'right' | 'left' }>`
  position: absolute;
  color: ${color('night-text')};
  opacity: 0;

  ${({ align }) => css`
    ${align}: 15px;
  `}
`
