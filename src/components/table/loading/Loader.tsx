import { css } from '@emotion/react'
import { SpinnerCentered } from 'components/spinner/SpinnerCentered'
import { size } from 'core/styles/spacing'

export function Loader() {
  return (
    <div
      css={css`
        display: grid;
        place-items: center;
        height: ${size(40)};
      `}
    >
      <SpinnerCentered />
    </div>
  )
}
