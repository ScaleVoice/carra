export const BREAKPOINTS = {
  XXS: 320,
  XS: 360,
  SM: 430,
  MD: 768,
  LG: 1024,
  XL: 1440,
  XXL: 1600,
  mobile: 0,
  tablet: 0,
  laptop: 1280
}

type Breakpoint = keyof typeof BREAKPOINTS

BREAKPOINTS.mobile = BREAKPOINTS.SM
BREAKPOINTS.tablet = BREAKPOINTS.LG

export const media = {
  gt: (key: Breakpoint) => `(min-width: ${BREAKPOINTS[key] + 1}px)`,
  lte: (key: Breakpoint) => `(max-width: ${BREAKPOINTS[key]}px)`
}
