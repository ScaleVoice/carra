export function formatEngineCcm(volume?: number, fallbackValue?: string) {
  const formattedVolume = ((volume ?? 0) / 1000).toFixed(1)

  return formattedVolume === '0.0' ? fallbackValue : formattedVolume
}
