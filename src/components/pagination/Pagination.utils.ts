export function resolvePagesArray(pagesTotal: number, currentPage: number) {
  if (pagesTotal === 1) {
    return [1]
  }

  if (pagesTotal === 2) {
    return [1, 2]
  }

  if (currentPage === 1) {
    return [currentPage, currentPage + 1, currentPage + 2]
  }

  if (currentPage === pagesTotal) {
    return [currentPage - 2, currentPage - 1, currentPage]
  }

  return [currentPage - 1, currentPage, currentPage + 1]
}

export function resolvePages(pagesTotal: number, currentPage: number) {
  const pages = resolvePagesArray(pagesTotal, currentPage)

  const shouldRenderFirstPage = pages[0] > 1
  const shouldRenderLastPage = pages[pages.length - 1] < pagesTotal

  return {
    pages,
    shouldRenderLeftDots: pages[0] !== 1 && currentPage - 2 > 1,
    shouldRenderRightDots:
      pages[pages.length - 1] !== pagesTotal && currentPage + 2 < pagesTotal,
    shouldRenderFirstPage,
    shouldRenderLastPage
  }
}
