import { css } from '@emotion/react'
import { size } from 'core/styles/spacing'
import { color, font, time } from 'core/styles/variables'

export const buttonSharedStyles = css`
  display: flex;
  position: relative;
  padding: ${size(4)} ${size(3)};

  font-size: 16px;
  line-height: 24px;
  text-align: center;
  align-items: center;
  justify-content: center;

  font-family: ${font('heading')};

  transition: ${time('control')} all;
  cursor: pointer;

  &[disabled] {
    cursor: unset;
    opacity: 0.4;
  }
`
export const primary = css`
  background: ${color('night-l-100')};
  color: ${color('white')};
  border: 2px solid ${color('night-l-100')};

  @media (hover: hover) {
    &:hover {
      background: ${color('night-l-200')};
      border: 2px solid ${color('night-l-200')};
    }
  }

  &:active {
    background: ${color('night')};
  }

  &[disabled] {
    background: ${color('night')};
  }
`

export const secondary = css`
  background: ${color('sun')};
  color: ${color('sun-d-500')} !important;
  border: 2px solid ${color('sun')};
  padding: calc(${size(4)} - 2px) ${size(3)};

  @media (hover: hover) {
    &:hover {
      background: ${color('sun-l-100')};
      border-color: ${color('sun-l-100')};
    }
  }

  &:active {
    background: ${color('sun-d-100')};
    border-color: ${color('sun-l-100')};
  }

  &[disabled] {
    background: ${color('sun')};
    border-color: ${color('sun')};
  }
`

export const tertiary = css`
  background: ${color('night-l-700')};
  color: ${color('night-l-100')};

  @media (hover: hover) {
    &:hover {
      background: ${color('night-l-100')};
      color: ${color('white')};
    }
  }

  &:active {
    background: ${color('night-l-650')};
    color: ${color('white')};
  }

  &[disabled] {
    background: ${color('night-l-800')};
  }
`

export const outline = css`
  color: ${color('night-l-100')};
  border: 2px solid ${color('night-l-650')};
  padding: calc(${size(4)} - 2px) ${size(16)};

  @media (hover: hover) {
    &:hover {
      color: ${color('night-l-100')};
      border-color: ${color('night-l-100')};
    }
  }

  &:active {
    color: ${color('night-d-100')};
    border-color: ${color('night-d-100')};
  }

  &[disabled] {
    color: ${color('night-l-100')};
    border-color: ${color('night-l-650')};
  }
`

export const whiteOutline = css`
  color: ${color('white')};
  border: 2px solid ${color('night-text')};
  padding: calc(${size(4)} - 2px) ${size(16)};

  @media (hover: hover) {
    &:hover {
      color: ${color('white')};
      border-color: ${color('night-text-light')};
    }
  }

  &:active {
    color: ${color('night-text')};
    border-color: ${color('night-text')};
  }

  &[disabled] {
    color: ${color('night-text')};
    border-color: ${color('night-text')};
  }
`

export const secondaryOutline = css`
  color: ${color('sun-d-500')} !important;
  border: 2px solid ${color('sun')};
  padding: calc(${size(4)} - 2px) ${size(8)};
  background-color: ${color('white')};

  @media (hover: hover) {
    &:hover {
      border-color: ${color('sun-l-100')};
    }
  }

  &:active {
    border-color: ${color('sun-d-100')};
  }

  &[disabled] {
    color: ${color('night-l-100')};
    border-color: ${color('sun')};
  }
`

export const warning = css`
  background: ${color('warning')};
  color: ${color('white')};

  @media (hover: hover) {
    &:hover {
      background: ${color('warning-d')};
    }
  }

  &[disabled] {
    opacity: 0.4;
    pointer-events: none;
  }
`

export const warningSecondary = css`
  background: ${color('warning-l-100')};
  color: ${color('warning')};
`

export const almond = css`
  background: ${color('almond-d-300')};
  color: ${color('white')};

  @media (hover: hover) {
    &:hover {
      background: ${color('almond-d-200')};
    }
  }

  &[disabled] {
    opacity: 0.4;
    pointer-events: none;
  }
`
