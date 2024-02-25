function getPaginationNumbers(totalPages: number, currentPage: number): (number | string)[] {
  const pages: (number | string)[] = []
  const ellipsis = "..."

  for (let i = 1; i <= Math.min(3, totalPages); i++) {
    pages.push(i)
  }
  if (currentPage > 4) {
    pages.push(ellipsis)
  }

  const startPage = Math.max(currentPage - 1, 4)
  const endPage = Math.min(currentPage + 1, totalPages - 3)

  for (let i = startPage; i <= endPage; i++) {
    if (!pages.includes(i) && i <= totalPages - 3 && i > 3) {
      pages.push(i)
    }
  }

  if (currentPage < totalPages - 3 && endPage < totalPages - 3) {
    pages.push(ellipsis)
  }

  if (totalPages > 3) {
    const lastThreePages = [totalPages - 2, totalPages - 1, totalPages]
    lastThreePages.forEach((page) => {
      if (!pages.includes(page)) {
        pages.push(page)
      }
    })
  }

  const refinedPages = pages.reduce((acc: (number | string)[], page, index, array) => {
    if (page === ellipsis) {
      if (index === 0 || index === array.length - 1 || array[index - 1] === ellipsis || array[index + 1] === ellipsis) {
        return acc
      }
      const prevPage = array[index - 1]
      const nextPage = array[index + 1]
      if (typeof prevPage === "number" && typeof nextPage === "number") {
        if (nextPage - prevPage === 1) {
          return acc
        }
      }
    }
    acc.push(page)
    return acc
  }, [])

  return refinedPages
}

export default getPaginationNumbers
