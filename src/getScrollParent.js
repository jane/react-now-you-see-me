const isScrollingElement = (el) => {
  const { overflow, overflowX, overflowY } = window && window.getComputedStyle(el)
  return [overflow, overflowX, overflowY].some(val => ['scroll', 'auto'].includes(val))
}

export default (el) => {
  let scrollParent = el
  while (scrollParent) {
    if (isScrollingElement(scrollParent)) {
      return scrollParent
    }
    scrollParent = scrollParent.parentElement
  }
  return window
}
