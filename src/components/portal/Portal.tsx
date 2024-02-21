import { ReactNode, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

type Props = {
  children: ReactNode
}

export function Portal(props: Props) {
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null)

  useEffect(() => {
    const portalContainerId = 'portal-container'
    let element = document.getElementById(portalContainerId)

    if (!element) {
      element = document.createElement('div')
      element.setAttribute('id', portalContainerId)
      element.setAttribute('data-testid', portalContainerId)
      document.body.appendChild(element)
    }

    setPortalElement(element)
  }, [])

  if (!portalElement) {
    return null
  }

  return createPortal(props.children, portalElement)
}
