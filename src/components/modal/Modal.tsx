import { css, SerializedStyles } from '@emotion/react'
import { Portal } from 'components/portal/Portal'
import IconCross from 'core/images/icons/IconCross.svg'
import { size } from 'core/styles/spacing'
import { AnimatePresence } from 'framer-motion'
import {
  PropsWithChildren,
  ReactNode,
  useCallback,
  useRef,
  useState
} from 'react'
import ReactFocusLock from 'react-focus-lock'
import { RemoveScroll } from 'react-remove-scroll'
import { useKey } from 'react-use'
import { SBackground, SCloseButton, SContent } from './Modal.styled'
import {
  getModalAnimationProps,
  ModalAllowCloseContext,
  ModalAnimationType,
  ModalCloseContext
} from './Modal.utils'

type Props = {
  isOpen: boolean
  onClose: () => void
  className?: string
  backgroundStyles?: SerializedStyles
  closeLabel: string
  hideCross?: boolean
  onCloseWithCross?: (() => void) | null
  animation?: ModalAnimationType
}

export function Modal(props: PropsWithChildren<Props>) {
  const {
    onClose,
    isOpen,
    children,
    className,
    backgroundStyles,
    closeLabel,
    onCloseWithCross,
    hideCross,
    animation
  } = props
  const [allowClose, setAllowClose] = useState(true)

  const handleClose = () => {
    if (allowClose) {
      onClose()
    }
  }

  useKey(
    'Escape',
    event => {
      event.stopPropagation()

      if (allowClose) {
        if (onCloseWithCross !== null && onCloseWithCross) {
          onCloseWithCross()
        } else {
          handleClose()
        }
      }
    },
    undefined,
    [allowClose]
  )

  return (
    <Portal>
      {isOpen ? (
        <ModalAllowCloseContext.Provider value={{ allowClose, setAllowClose }}>
          <ModalCloseContext.Provider value={handleClose}>
            <SBackground
              onClick={
                onCloseWithCross !== null ? onCloseWithCross : handleClose
              }
              css={backgroundStyles}
            />

            <AnimatePresence>
              <ReactFocusLock returnFocus autoFocus={false}>
                <RemoveScroll forwardProps enabled>
                  <SContent
                    layout
                    role="dialog"
                    aria-modal="true"
                    className={className}
                    {...getModalAnimationProps(animation)}
                  >
                    {children}

                    {hideCross !== true && (
                      <SCloseButton
                        onClick={
                          onCloseWithCross ? onCloseWithCross : handleClose
                        }
                        aria-label={closeLabel}
                      >
                        <IconCross
                          css={css({ display: 'block' })}
                          width={size(6)}
                          height={size(6)}
                        />
                      </SCloseButton>
                    )}
                  </SContent>
                </RemoveScroll>
              </ReactFocusLock>
            </AnimatePresence>
          </ModalCloseContext.Provider>
        </ModalAllowCloseContext.Provider>
      ) : null}
    </Portal>
  )
}

type UseModalOpts = {
  wrapperStyles?: SerializedStyles
  backgroundStyles?: SerializedStyles
  wide?: boolean
  closeLabel: string
  hideCross?: boolean
  onCloseWithCross?: (() => void) | null
  animation?: ModalAnimationType
}

export const useModal = (render: () => ReactNode, opts: UseModalOpts) => {
  const { wrapperStyles, backgroundStyles } = opts || {}

  const [isOpen, setIsOpen] = useState(false)
  const closeCallback = useRef<(() => void) | null>(null)

  const openModal: () => Promise<void> = useCallback(() => {
    return new Promise(resolve => {
      setIsOpen(true)
      closeCallback.current = resolve
    })
  }, [])

  const onCloseModal = () => {
    closeCallback.current && closeCallback.current()
    setIsOpen(false)
  }

  const modal = (
    <Modal
      backgroundStyles={backgroundStyles}
      css={wrapperStyles}
      isOpen={isOpen}
      onClose={onCloseModal}
      closeLabel={opts.closeLabel}
      hideCross={opts.hideCross}
      onCloseWithCross={opts.onCloseWithCross}
      animation={opts.animation}
    >
      {isOpen ? render() : null}
    </Modal>
  )

  return [modal, openModal] as const
}
