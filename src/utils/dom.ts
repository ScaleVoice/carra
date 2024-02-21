import {
  LOCAL_STORAGE_KEYS,
  MEMORY_STORAGE_KEYS,
  SESSION_STORAGE_KEYS,
  STORAGE_KEYS_PREFIX
} from 'constants/storage'
import { useEffect, useState } from 'react'

export function scrollToTop() {
  return window.scrollTo({ behavior: 'smooth', top: 0 })
}

export function scrollToElement(elementId: string, spaceTop = 0) {
  const element = document.getElementById(elementId)
  const bodyRect = document.body.getBoundingClientRect().top

  if (element) {
    const elementRect = element.getBoundingClientRect().top
    const elementPosition = elementRect - bodyRect - spaceTop

    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    })
  }
}

export function hasWindow() {
  return typeof window !== 'undefined'
}

export function hasDocument() {
  return typeof document !== 'undefined'
}

export interface StorageClient<KeyType extends string> {
  setItem: (key: KeyType, value: string) => void

  getItem: (key: KeyType) => string | null | undefined

  removeItem: (key: KeyType) => void | undefined
}

export function getSessionStorageClient<KeyType extends string>(
  prefix: string
): StorageClient<KeyType> {
  function setItem(key: KeyType, value: string) {
    hasWindow() && sessionStorage.setItem(`${prefix}.${key}`, value)
  }

  function getItem(key: KeyType) {
    return hasWindow() ? sessionStorage.getItem(`${prefix}.${key}`) : undefined
  }

  function removeItem(key: KeyType) {
    return hasWindow()
      ? sessionStorage.removeItem(`${prefix}.${key}`)
      : undefined
  }

  return { setItem, getItem, removeItem }
}

export function getLocalStorageClient<KeyType extends string>(
  prefix: string
): StorageClient<KeyType> {
  function setItem(key: KeyType, value: string) {
    hasWindow() && localStorage.setItem(`${prefix}.${key}`, value)
  }

  function getItem(key: KeyType) {
    return hasWindow() ? localStorage.getItem(`${prefix}.${key}`) : undefined
  }

  function removeItem(key: KeyType) {
    hasWindow() && localStorage.removeItem(`${prefix}.${key}`)
  }

  return { setItem, getItem, removeItem }
}

export function getMemoryStorageClient<
  KeyType extends string
>(): StorageClient<KeyType> {
  const storage: Record<string, string> = {}

  function setItem(key: KeyType, value: string) {
    hasWindow() && (storage[key] = value)
  }

  function getItem(key: KeyType) {
    return hasWindow() ? storage[key] : undefined
  }

  function removeItem(key: KeyType) {
    hasWindow() && delete storage[key]
  }

  return { setItem, getItem, removeItem }
}

export const localStorageClient =
  getLocalStorageClient<LOCAL_STORAGE_KEYS>(STORAGE_KEYS_PREFIX)

export const sessionStorageClient =
  getSessionStorageClient<SESSION_STORAGE_KEYS>(STORAGE_KEYS_PREFIX)

export const memoryStorageClient = getMemoryStorageClient<MEMORY_STORAGE_KEYS>()

export function useStorageKey<T extends string>(
  key: T,
  options: {
    client: StorageClient<T>
    onMissing?: () => void
  }
) {
  const [value, setValue] = useState<{ value: string | null } | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const { onMissing, client } = options
  useEffect(() => {
    setValue({ value: client.getItem(key) ?? null })
    setLoading(false)
  }, [key, client])

  useEffect(() => {
    if (value != null && value?.value == null) {
      onMissing?.()
      setLoading(false)
    }
  }, [value, onMissing])

  return [value, loading] as const
}

export function isEventTargetSpecificTag<K extends keyof HTMLElementTagNameMap>(
  el: Element | EventTarget | null,
  tagName: K
): el is HTMLElementTagNameMap[K] {
  return el instanceof HTMLElement && el.tagName.toLowerCase() === tagName
}
