export const on = (evtName, opts) => (el) => (fn) => {
  el.addEventListener(evtName, fn, opts)
  return () => {
    el.removeEventListener(evtName, fn)
    fn.cancel && fn.cancel()
  }
}

const isBetween = (minInclusive, max) => (target) => Math.max(Math.min(max, target), minInclusive) === target
const isBoundingClientRectInRange = ({ targetRect, boundingRect, fullyContained }) => {
  const horizBounds = isBetween(boundingRect.left, boundingRect.right)
  const vertBounds = isBetween(boundingRect.top, boundingRect.bottom)
  return fullyContained
    ? horizBounds(targetRect.left) && horizBounds(targetRect.right) &&
      vertBounds(targetRect.top) && vertBounds(targetRect.bottom)
    : horizBounds(targetRect.left) || horizBounds(targetRect.right) ||
      vertBounds(targetRect.top) || vertBounds(targetRect.bottom)
}

export const inViewport = ({
  threshold = 0,
  offsetVert = window.innerHeight * threshold,
  offsetHoriz = window.innerWidth * threshold,
  boundingLeft,
  boundingRight,
  requireEntireElementInViewport = false
}) => {
  const isElInView = (element) => {
    if (!element) return false
    if (!element.offsetParent) return true
    const horizMin = 0 - offsetHoriz
    const horizMax = window.innerWidth + offsetHoriz
    const vertMin = 0 - offsetVert
    const vertMax = window.innerHeight + offsetVert
    return isBoundingClientRectInRange({
      targetRect: element.getBoundingClientRect(),
      boundingRect: {
        top: vertMin,
        bottom: vertMax,
        left: isNaN(boundingLeft) ? horizMin : boundingLeft,
        right: isNaN(boundingRight) ? horizMax : boundingRight },
      fullyContained: requireEntireElementInViewport })
  }

  return isElInView
}
