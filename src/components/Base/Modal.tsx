import { useOnClickOutside } from "@/hooks/useOnClickOutside"
import { FC, PropsWithChildren, forwardRef, useRef } from "react"
import { twMerge } from "tailwind-merge"

export type ModalProps = PropsWithChildren & {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  className?: string
  disableClickOutside?: boolean
  Overlay?: React.ElementType
  disableOverlay?: boolean
}

export const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  className,
  disableClickOutside = false,
  Overlay,
  disableOverlay,
}) => {
  const ref = useRef(null)
  useOnClickOutside(ref, onClose, disableClickOutside)

  if (!isOpen) {
    return null
  }

  if (!disableOverlay) {
    return (
      <>
        {Overlay ? (
          <Overlay>
            <ModalContent ref={ref} className={className}>
              {children}
            </ModalContent>
          </Overlay>
        ) : (
          <div className="fade-in fixed inset-0 z-50 flex h-screen w-screen items-center justify-center overflow-y-auto overflow-x-hidden bg-black/30">
            <ModalContent ref={ref} className={className}>
              {children}
            </ModalContent>
          </div>
        )}
      </>
    )
  }

  return (
    <ModalContent ref={ref} className={className}>
      {children}
    </ModalContent>
  )
}

interface ModalContentProps {
  children: React.ReactNode
  className?: string
}

const ModalContent = forwardRef<HTMLDivElement, ModalContentProps>(({ children, className }, ref) => {
  return (
    <div ref={ref} className={twMerge("flex flex-col items-center rounded-lg p-5 pt-7 shadow-md md:p-10", className)}>
      {children}
    </div>
  )
})

ModalContent.displayName = "ModalContent"
