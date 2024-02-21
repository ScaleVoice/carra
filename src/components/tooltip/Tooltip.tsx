import Tippy from '@tippyjs/react'
import { useSpring } from 'framer-motion'
import { PropsWithChildren, ReactNode } from 'react'
import { Instance, Placement } from 'tippy.js'
import { SArrow, SBox } from './Tooltip.styled'

type Props = {
  className?: string
  placement?: Placement
  content: ReactNode
  maxWidth?: string
  isDisabled?: boolean
  visible?: boolean
}

export function Tooltip(props: PropsWithChildren<Props>) {
  const springConfig = { damping: 15, stiffness: 300 }
  const initialScale = 0.5

  const opacity = useSpring(0, springConfig)
  const scale = useSpring(initialScale, springConfig)

  function onMount() {
    scale.set(1)
    opacity.set(1)
  }

  function onHide(instance: Instance) {
    const cleanup = scale.onChange(value => {
      if (value <= initialScale) {
        cleanup()
        instance.unmount()
      }
    })

    scale.set(initialScale)
    opacity.set(0)
  }

  return (
    <Tippy
      disabled={props.isDisabled}
      visible={props.visible}
      render={attrs => (
        <SBox
          {...attrs}
          style={{ scale, opacity, maxWidth: props.maxWidth }}
          tabIndex={-1}
        >
          {props.content}
          <SArrow
            data-popper-arrow={
              props.placement === 'bottom-start' ? undefined : ''
            }
          />
        </SBox>
      )}
      placement={props.placement || 'auto'}
      animation={true}
      onMount={onMount}
      onHide={onHide}
    >
      <div className={props.className}>{props.children}</div>
    </Tippy>
  )
}
