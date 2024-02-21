import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { ErrorMessage } from 'components/errorMessage/ErrorMessage'
import { TextBody } from 'components/text/Text'
import { size } from 'core/styles/spacing'
import { color, font, radius, time } from 'core/styles/variables'

export const SFieldset = styled.fieldset`
  --space-height: 2px;
  --label-height: 14px;
  --top-padding: calc(
    ${size(2)} + (var(--label-height) - var(--space-height)) / 2
  );
  --left-padding: ${size(4)};
`

type ContainerProps = {
  label: string | undefined
  hasError?: boolean
  isDisabled?: boolean
  isReadOnly?: boolean
  isTextarea?: boolean
  variant?: 'rounded' | 'normal'
  disabledMode?: 'solid'
  isMultiSelect?: boolean
  isBorderless?: boolean
}

export const SContainer = styled.div<ContainerProps>`
  display: flex;
  border: 2px solid
    ${({ variant }) =>
      variant === 'rounded' ? color('night-l-650') : color('night-l-700')};

  ${({ isBorderless }) =>
    isBorderless &&
    css`
      border: none;
    `}

  border-radius: ${({ variant }) =>
    variant === 'rounded' ? radius('corner-larger') : radius('input')};

  transition: border-color ${time('control')}, opacity ${time('control')};

  ${({ isTextarea, label }) =>
    isTextarea &&
    label &&
    css`
      padding-top: calc(${size(2)} + var(--label-height));
    `};

  flex-direction: row;
  align-items: center;
  position: relative;

  &:focus-within {
    border-color: ${color('night-l-650')};
  }

  & label {
    font-size: 16px;
    line-height: 24px;
    color: ${color('night-text')};

    position: absolute;
    top: 0;
    left: var(--left-padding);

    pointer-events: none;
    transform: ${({ isMultiSelect }) =>
      isMultiSelect
        ? `translateY(${size(1)}) scale(calc(12 / 16))`
        : 'translateY(var(--top-padding))'};
    transform-origin: left center;
    transition: all ${time('control')};

    z-index: 2;
  }

  & input,
  & textarea,
  & select {
    border: none;
    border-radius: ${({ variant }) =>
      variant === 'rounded' ? radius('corner-larger') : radius('input')};

    font-family: ${font('text')};

    width: 100%;

    padding: var(--top-padding) var(--left-padding);

    ${({ variant }) =>
      variant === 'rounded' &&
      css`
        border-radius: ${radius('corner-larger')};
        padding-right: calc(var(--left-padding) * 3);
      `}

    ${({ isDisabled, disabledMode }) =>
      css`
        opacity: ${isDisabled && disabledMode === 'solid' && 0.8};
      `}

    font-size: 16px;
    line-height: 24px;

    background-color: ${color('white')};

    /* unset vendor styles for select */
    appearance: none;

    ${({ isReadOnly }) =>
      isReadOnly &&
      css`
        background-color: ${color('night-l-800')};
        color: ${color('night-text')};
      `}

    ${({ label, isTextarea }) =>
      label &&
      !isTextarea &&
      css`
        &:not(:placeholder-shown) {
          padding: calc(${size(2)} - var(--space-height)) var(--left-padding);
          padding-top: calc(${size(2)} + var(--label-height));
        }
      `}

    ${({ label, isTextarea }) =>
      label &&
      isTextarea &&
      css`
        padding-top: 0;

        &:placeholder-shown {
          margin-top: -${size(2)};
        }

        &:not(:placeholder-shown) {
          margin-top: 2px;
        }
      `}

    ${({ label }) =>
      label &&
      css`
        &:not(:placeholder-shown) {
          & ~ label {
            transform: translateY(${size(1)}) scale(calc(12 / 16));
          }
        }
      `}

    &::-ms-reveal {
      display: none;
    }

    &::-webkit-validation-bubble-message {
      display: none;
    }
  }

  & textarea {
    resize: vertical;
  }

  ${({ hasError }) => {
    if (hasError)
      return css`
        &,
        &:focus-within {
          border-color: ${color('warning')};
        }
      `
    return null
  }}

  ${({ isDisabled, disabledMode }) =>
    isDisabled &&
    css`
      opacity: ${disabledMode === 'solid' ? 0.8 : 0.4};
    `}

  ${({ isReadOnly }) =>
    isReadOnly &&
    css`
      background-color: ${color('night-l-800')};
      border: 2px solid ${color('night-l-700')};

      &:focus-within {
        border-color: ${color('night-l-700')};
      }
    `}
`

export const SError = styled(ErrorMessage)`
  text-align: left;
  width: 100%;
  margin-top: ${size(1)};
`

export const SHint = styled(TextBody)`
  text-align: left;
  width: 100%;
  margin-top: ${size(1)};
`

export const SRequired = styled.span`
  padding-left: 3px;
  color: red;
`
