export const getValue = (value?: string | number) => {
  if (!value) return "-"

  return String(value)
}
