export function downloadUrl(
  url: string,
  filename?: string,
  options?: { sameTab?: boolean }
) {
  const a = document.createElement('a')
  a.style.display = 'none'
  document.body.appendChild(a)

  // Set the HREF to a Blob representation of the data to be downloaded
  a.href = url
  if (!options?.sameTab) {
    a.target = '_blank'
  }
  a.download = filename ?? ((url.includes('/') && url.split('/').pop()) || url)
  a.click()

  document.body.removeChild(a)
}

export function resolveImgSrcFromBase64SvgString(base64?: string) {
  return `data:image/svg+xml;base64,${base64}`
}
