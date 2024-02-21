import { useEffect, useRef } from 'react'
import { toast } from 'react-toastify'
import { useCopyToClipboard as useCopy } from 'react-use'
interface useKeyDownOptions {
  preventDefault?: boolean
}

export function useKeyDown(
  key: string,
  callback: () => void,
  options?: useKeyDownOptions
) {
  const ref = useRef<() => void>()
  useEffect(() => {
    ref.current = callback
  }, [callback])

  useEffect(() => {
    function listener(ev: KeyboardEvent) {
      if (ev.code === key) {
        if (options?.preventDefault) {
          ev.preventDefault()
        }
        ref.current?.()
      }
    }

    window.addEventListener('keydown', listener)
    return () => void window.removeEventListener('keydown', listener)
  }, [key, options])
}

export const useCopyToClipboard = () => {
  const [, copy] = useCopy()

  const copyToClipboard = (text: string, message?: string) => {
    copy(text)
    toast.success(message || 'Text copied')
  }

  return { copyToClipboard }
}
