import { SerializedStyles } from '@emotion/react'
import { ModifierPhases, Placement } from '@popperjs/core/lib/enums'
import { State } from '@popperjs/core/lib/types'
import { Divider } from 'components/divider/Divider'
import { Portal } from 'components/portal/Portal'
import { ResponsiveValue } from 'core/styles/responsivity'
import { definitions } from 'core/styles/variables'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Children,
  ReactNode,
  cloneElement,
  createContext,
  forwardRef,
  isValidElement,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState
} from 'react'
import { usePopper } from 'react-popper'
import { useClickAway } from 'react-use'
import { useKeyDown } from 'utils/hooks'
import { isNil, isNum } from 'utils/types'
import {
  SBackground,
  SContent,
  SHeader,
  SItems,
  SWrapper
} from './Dropdown.styled'

type DropdownContextType = {
  open: boolean
  setOpen?: (value: boolean) => void
}

export const DropdownContext = createContext<DropdownContextType>({
  open: false
})

export function useDropdownContext(): DropdownContextType {
  const ctx = useContext(DropdownContext)
  if (!ctx) {
    throw new Error('Please use this hook inside Dropdown component.')
  }

  return ctx
}

interface Props {
  trigger: ReactNode
  header?: ReactNode
  placement?: Placement
  padding?: ResponsiveValue<'none' | 'small' | 'large'>
  isFullHeight?: boolean
  variant?: 'default' | 'large'
  dontCloseOnClick?: boolean
  disableCloseOutsideClose?: boolean
  disableUnmountChilds?: boolean
  hasFooter?: boolean
  onClose?: () => void
  onOpen?: () => void
  isMobileFull?: boolean // full fill screen on mobile
  height?: string
  isInModal?: boolean
  yOffset?: number
  className?: string
  fullWidth?: boolean
  containerRef?: React.MutableRefObject<HTMLDivElement | null>
  children?: ReactNode
  wrapperStyle?: string
  triggerWrapperStyle?: SerializedStyles
  closeOnEscape?: boolean
  newDesign?: boolean
  scrollbarColor?: keyof (typeof definitions)['c']
  /**
   * Override popper reference element
   */
  refElement?: React.MutableRefObject<HTMLDivElement | null>
  disabled?: boolean
}

export interface DropdownRefProps {
  close: () => void
  open: () => void
}

const dropdownVariant = {
  expanded: {
    display: 'block',
    opacity: 1
  },
  collapsed: {
    display: 'none',
    opacity: 0
  }
}

function DropdownConnect(
  {
    trigger,
    header,
    isFullHeight,
    placement,
    padding,
    variant,
    dontCloseOnClick,
    disableCloseOutsideClose,
    hasFooter,
    children,
    isMobileFull,
    onClose,
    onOpen,
    height,
    isInModal,
    yOffset,
    className,
    wrapperStyle,
    fullWidth = false,
    containerRef,
    disableUnmountChilds = false,
    triggerWrapperStyle,
    closeOnEscape,
    refElement,
    newDesign,
    scrollbarColor,
    disabled
  }: Props,
  ref: React.Ref<DropdownRefProps>
) {
  const [open, setOpen] = useState(false)
  const [referenceElement, setReferenceElement] =
    useState<HTMLDivElement | null>(null)
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  )

  const setPopperWidth = useMemo(
    () => ({
      name: 'sameWidth',
      enabled: fullWidth,
      phase: 'beforeWrite' as ModifierPhases,
      requires: ['computeStyles'],
      fn({ state }: { state: State }) {
        state.styles.popper.minWidth = `${state.rects.reference.width}px`
      },
      effect({ state }: { state: State }) {
        const reference = state.elements.reference as HTMLElement
        state.elements.popper.style.minWidth = `${reference.offsetWidth}px`
      }
    }),
    [fullWidth]
  )

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: placement ?? 'bottom-end',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, isNum(yOffset) ? yOffset : 8]
        }
      },
      {
        name: 'preventOverflow',
        options: {
          padding: fullWidth ? 0 : 16
        }
      },

      setPopperWidth
    ]
  })

  const container = useRef<HTMLDivElement | null>(null)

  useClickAway(container, event => {
    if (disableCloseOutsideClose) {
      return
    }
    if (event.target instanceof Node) {
      if (referenceElement?.contains(event.target)) {
        return
      }

      setOpen(false)
    }
  })

  useImperativeHandle(ref, () => ({
    close: () => {
      setOpen(false)
    },
    open: () => {
      setOpen(true)
    }
  }))

  useEffect(() => {
    open ? onOpen?.() : onClose?.()
  }, [onClose, onOpen, open])

  const isFullMobileStyles = !!isMobileFull

  const onEscape = () => {
    if (closeOnEscape && open) setOpen(false)
  }

  useKeyDown('Escape', onEscape, {
    preventDefault: true
  })

  useEffect(() => {
    if (refElement) {
      setReferenceElement(refElement.current)
    }
  }, [refElement])

  function renderContent() {
    return (
      <SWrapper
        isInModal={isInModal}
        isFullMobileStyles={isFullMobileStyles}
        ref={setPopperElement}
        style={isMobileFull ? undefined : styles.popper}
        className={wrapperStyle}
        {...attributes.popper}
      >
        <SContent
          className={className}
          variant={fullWidth ? 'full' : variant}
          ref={container}
          isFullMobileStyles={isFullMobileStyles}
          initial="closed"
          newDesign={newDesign}
          animate="open"
          exit="closed"
          variants={{
            open: { opacity: 1, rotateX: 0, translateY: 0 },
            closed: {
              opacity: 0,
              rotateX: isFullMobileStyles ? 0 : -20,
              translateY: isFullMobileStyles ? 0 : 5
            }
          }}
          transition={{ duration: 0.2 }}
          hasFooter={hasFooter}
        >
          {header && (
            <>
              <SHeader padding={padding}>{header}</SHeader>
              <Divider />
            </>
          )}
          <SItems
            isFullMobileStyles={isFullMobileStyles}
            isFullHeight={isFullHeight}
            padding={padding}
            height={height}
            ref={containerRef}
            scrollbarColor={scrollbarColor}
          >
            {dontCloseOnClick
              ? children
              : Children.map(children, item => {
                  if (isValidElement<{ onClick: () => void }>(item)) {
                    return cloneElement(item, {
                      onClick: () => {
                        item.props.onClick?.()
                        setOpen(false)
                      }
                    })
                  }

                  return item
                })}
          </SItems>
        </SContent>
      </SWrapper>
    )
  }

  return (
    <DropdownContext.Provider value={{ open, setOpen }}>
      <div css={triggerWrapperStyle}>
        {open && isMobileFull && (
          <SBackground
            key="background"
            initial="closed"
            animate="open"
            exit="closed"
            variants={{
              open: { opacity: 1 },
              closed: { opacity: 0 }
            }}
            transition={{ duration: 0.2 }}
          />
        )}

        <div
          ref={isNil(refElement) ? setReferenceElement : undefined}
          onClick={() => {
            if (disabled) return
            setOpen(prev => !prev)
          }}
        >
          {isValidElement<{ state: 'open' | 'closed'; isActive: boolean }>(
            trigger
          ) &&
            cloneElement(trigger, {
              state: open ? 'open' : 'closed',
              isActive: open
            })}
        </div>

        <Portal>
          {disableUnmountChilds ? (
            <motion.div
              transition={{
                type: 'tween',
                duration: 0.1
              }}
              variants={dropdownVariant}
              initial="collapsed"
              animate={open ? 'expanded' : 'collapsed'}
            >
              {renderContent()}
            </motion.div>
          ) : (
            <AnimatePresence>{open && <>{renderContent()}</>}</AnimatePresence>
          )}
        </Portal>
      </div>
    </DropdownContext.Provider>
  )
}

export const Dropdown = forwardRef(DropdownConnect)
