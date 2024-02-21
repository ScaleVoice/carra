import { css, CSSObject, SerializedStyles } from '@emotion/react'
import { media } from 'core/styles/media'
import { useEffect, useState } from 'react'

export type ResponsiveValue<Atom> =
  | Readonly<[Atom, Atom, Atom, Atom, Atom, Atom]>
  | Readonly<[Atom, Atom, Atom, Atom]>
  | Readonly<[Atom, Atom, Atom]>
  | Readonly<[Atom, Atom]>
  | Readonly<[Atom]>
  | Atom

type CSSResult = CSSObject | SerializedStyles

function applyStyle<Key extends string | number>(
  value: Key,
  resolved: Record<Key, CSSResult> | ((value: Key) => CSSResult | undefined)
): CSSResult | undefined {
  if (typeof resolved === 'function') {
    return resolved(value)
  }
  return resolved[value]
}

export function getResponsiveStyles<Key extends string | number>(
  value: ResponsiveValue<Key> | undefined,
  valueMap: Record<Key, CSSResult> | ((value: Key) => CSSResult | undefined)
): SerializedStyles | undefined {
  if (value == null) return undefined

  if (typeof value === 'string' || typeof value === 'number') {
    return css(applyStyle(value, valueMap))
  }

  if (Array.isArray(value)) {
    const { length } = value

    if (length === 2) {
      const [mobile, tablet] = value

      return css`
        @media ${media.lte('SM')} {
          ${applyStyle(mobile, valueMap)}
        }

        @media ${media.gt('SM')} {
          ${applyStyle(tablet, valueMap)}
        }
      `
    }

    if (length === 3) {
      const [mobile, tablet, desktop] = value as Readonly<[Key, Key, Key]>

      return css`
        @media ${media.lte('SM')} {
          ${applyStyle(mobile, valueMap)}
        }

        @media ${media.gt('SM')} and ${media.lte('LG')} {
          ${applyStyle(tablet, valueMap)}
        }

        @media ${media.gt('LG')} {
          ${applyStyle(desktop, valueMap)}
        }
      `
    }

    if (length === 4) {
      const [mobile, tablet, laptop, desktop] = value as Readonly<
        [Key, Key, Key, Key]
      >

      return css`
        @media ${media.lte('SM')} {
          ${applyStyle(mobile, valueMap)}
        }

        @media ${media.gt('SM')} and ${media.lte('LG')} {
          ${applyStyle(tablet, valueMap)}
        }

        @media ${media.gt('LG')} and ${media.lte('laptop')} {
          ${applyStyle(laptop, valueMap)}
        }

        @media ${media.gt('laptop')} {
          ${applyStyle(desktop, valueMap)}
        }
      `
    }

    if (length === 6) {
      const [xs, sm, md, lg, xl, xxl] = value as Readonly<
        [Key, Key, Key, Key, Key, Key]
      >

      return css`
        @media ${media.lte('XS')} {
          ${applyStyle(xs, valueMap)}
        }

        @media ${media.gt('XS')} and ${media.lte('SM')} {
          ${applyStyle(sm, valueMap)}
        }

        @media ${media.gt('SM')} and ${media.lte('MD')} {
          ${applyStyle(md, valueMap)}
        }

        @media ${media.gt('MD')} and ${media.lte('LG')} {
          ${applyStyle(lg, valueMap)}
        }

        @media ${media.gt('LG')} and ${media.lte('XL')} {
          ${applyStyle(xl, valueMap)}
        }

        @media ${media.gt('XL')} {
          ${applyStyle(xxl, valueMap)}
        }
      `
    }

    if (length === 1) {
      const [mobile] = value
      return css(applyStyle(mobile, valueMap))
    }

    throw new Error(`Invalid responsive value: ${JSON.stringify(value)}`)
  }

  throw new Error(`Invalid responsive value: ${JSON.stringify(value)}`)
}

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    let isMounted = true

    const list = window.matchMedia(query)
    const listener = () => {
      if (!isMounted) return
      setMatches(list.matches)
    }

    // NOTE: this is needed for old iOS
    if (typeof list.addEventListener === 'function') {
      list.addEventListener('change', listener)
    } else {
      list.addListener(listener)
    }

    setMatches(list.matches)

    return () => {
      isMounted = false

      // NOTE: this is needed for old iOS
      if (typeof list.removeEventListener === 'function') {
        list.removeEventListener('change', listener)
      } else {
        list.removeListener(listener)
      }
    }
  }, [query])

  return matches
}
