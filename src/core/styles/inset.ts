export function insetX(size: number | string) {
  const value = typeof size === 'number' ? size + 'px' : size
  return { left: value, right: value }
}

export function insetY(size: number | string) {
  const value = typeof size === 'number' ? size + 'px' : size
  return { top: value, bottom: value }
}

export function inset(size: number | string) {
  const value = typeof size === 'number' ? size + 'px' : size
  return { top: value, bottom: value, left: value, right: value }
}
