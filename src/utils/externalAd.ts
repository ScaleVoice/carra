import { URLS } from 'constants/urls'
import { MutableRefObject, useEffect } from 'react'

export function useAdvertisementHtmlPage(
  pageWrapperRef: MutableRefObject<HTMLIFrameElement | null>,
  adUrl?: string
) {
  useEffect(() => {
    async function getAdvertisementHtml() {
      if (!adUrl) {
        return
      }

      try {
        const response = await fetch(URLS.advertisement, {
          method: 'POST',
          body: JSON.stringify({ url: adUrl }),
          headers: {
            'Content-Type': 'application/json'
          }
        })

        const htmlContent = await response.text()
        const modifiedHtml = updateResourceUrls(htmlContent, adUrl)

        if (pageWrapperRef.current) {
          const iframeDoc = pageWrapperRef.current.contentDocument

          if (iframeDoc) {
            iframeDoc.open()
            iframeDoc.write(modifiedHtml)
            iframeDoc.close()
          }
        }
      } catch (error) {
        console.error('Error fetching HTML page:', error)
      }
    }

    getAdvertisementHtml()
  }, [adUrl, pageWrapperRef])
}

// function that fixed base url for resources of external website
const updateResourceUrls = (htmlContent: string, baseUrl: string) => {
  const doc = new DOMParser().parseFromString(htmlContent, 'text/html')
  const baseElement = doc.createElement('base')
  baseElement.href = baseUrl
  doc.head.appendChild(baseElement)

  const resourceTags = doc.querySelectorAll(
    'img, script, link[rel="stylesheet"]'
  )
  resourceTags.forEach(tag => {
    const src = tag.getAttribute('src')
    const href = tag.getAttribute('href')
    if (src && !src.startsWith('http') && !src.startsWith('//')) {
      const absoluteSrc = new URL(src, baseUrl).href
      tag.setAttribute('src', absoluteSrc)
    }
    if (href && !href.startsWith('http') && !href.startsWith('//')) {
      const absoluteHref = new URL(href, baseUrl).href
      tag.setAttribute('href', absoluteHref)
    }
  })

  const styleTags = doc.querySelectorAll('style')
  styleTags.forEach(tag => {
    const cssText = tag.textContent
    if (cssText) {
      const updatedCssText = cssText.replace(
        /url\((?!['"]?(?:https?:)?\/\/)/g,
        `url(${baseUrl}`
      )
      tag.textContent = updatedCssText
    }
  })

  return doc.documentElement.outerHTML
}
