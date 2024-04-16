import { createPortal } from 'react-dom'
import { ReactNode, useLayoutEffect, useState } from 'react'

interface CalendarPortalProps {
  children: ReactNode
}

export function CalendarPortal(props: CalendarPortalProps) {
  const calendarContent = document.getElementsByClassName('rbc-time-content')

  const [el] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.createElement('div')
    }
    return null
  })

  const [node] = useState(() => {
    if (typeof window !== 'undefined') {
      return calendarContent[0] ?? document.body
    }
    return null
  })

  useLayoutEffect(() => {
    if (node && el) {
      node.appendChild(el)
    }
    return () => {
      if (node && el) {
        node.removeChild(el)
      }
    }
  }, [el, node])

  if (typeof window !== 'undefined' && el !== null) {
    return createPortal(props.children, el)
  }

  return null
}
