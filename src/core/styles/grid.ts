import { css } from '@emotion/react'
import { size } from 'core/styles/spacing'

export function columnGrid(count = 12) {
  return css`
    display: grid;
    grid-template-columns:
      repeat(${count - 1}, [col-start] 1fr [col-end] ${size(10)})
      [col-start] 1fr [col-end];
    grid-template-areas: '${Array(count)
      .fill(0)
      .map((_, i) => `col-${i + 1}`)
      .join(' . ')}';
  `
}

export function sideGrid(count = 12, padding = 4) {
  return css`
    --s-padding: ${size(padding)};
    --s-width: ${size(320)};
    --s-space: minmax(var(--s-padding), calc((100% - var(--s-width)) / 2));
    --s-content: repeat(
        ${count - 1},
        [col-start] minmax(0, 1fr) [col-end] ${size(10)}
      )
      [col-start] minmax(0, 1fr) [col-end];

    display: grid;
    grid-template-columns: var(--s-space) var(--s-content) var(--s-space);
    grid-template-areas: 'col-left ${Array(count)
      .fill(0)
      .map((_, i) => `col-${i + 1}`)
      .join(' . ')} col-right';

    &:before,
    &:after {
      content: '';
    }
  `
}
