import { MotionProps } from 'framer-motion'
import { createContext, useContext } from 'react'

type AllowCloseContext = {
  allowClose: boolean
  setAllowClose: (val: boolean) => void
}

export type ModalAnimationType = 'fade-in' | 'slide-in-right' | 'slide-in-left'

export const ModalAllowCloseContext = createContext<
  AllowCloseContext | undefined
>(undefined)

export const useModalAllowCloseContext = (): AllowCloseContext => {
  const ctx = useContext(ModalAllowCloseContext)
  if (!ctx) {
    throw new Error('Please use this hook inside Modal component.')
  }

  return ctx
}

type ModalCloseContext = () => void

export const ModalCloseContext = createContext<ModalCloseContext | undefined>(
  undefined
)

export const useCloseModalContext = () => {
  const ctx = useContext(ModalCloseContext)
  if (!ctx) {
    throw new Error('Please use this hook inside Modal component.')
  }

  return ctx
}

export const useCloseModalContextOptional = (enabled = true) => {
  const ctx = useContext(ModalCloseContext)
  if (enabled && !ctx) {
    throw new Error('Please use this hook inside Modal component.')
  }

  return ctx
}

const fadeInAnimationProps: MotionProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.2 }
}
const slideInLeftAnimationProps: MotionProps = {
  initial: { x: '-100%' },
  animate: { x: 0 },
  transition: { duration: 0.25 }
}
const slideInRightAnimationProps: MotionProps = {
  initial: { x: '100%' },
  animate: { x: 0 },
  transition: { duration: 0.25 }
}

export function getModalAnimationProps(
  animationType?: ModalAnimationType
): MotionProps {
  if (animationType === 'fade-in') {
    return fadeInAnimationProps
  }

  if (animationType === 'slide-in-left') {
    return slideInLeftAnimationProps
  }

  if (animationType == 'slide-in-right') {
    return slideInRightAnimationProps
  }

  return {}
}
