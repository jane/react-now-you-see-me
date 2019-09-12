const isFn = (f) => typeof f === 'function'

export const on = (evtName, opts) => (el) => (fn) => {
  if (isFn(el.addEventListener)) {
    el.addEventListener(evtName, fn, opts)
  }
  return () => {
    if (isFn(el.removeEventListener)) {
      el.removeEventListener(evtName, fn)
    }
    if (isFn(fn.cancel)) {
      fn.cancel()
    }
  }
}

const isBetween = (minInclusive, max) => (target) =>
  Math.max(Math.min(max, target), minInclusive) === target

export const isBoundingClientRectInRange = ({
  targetRect,
  boundingRect,
  fullyContained,
}) => {
  const horizBounds = isBetween(boundingRect.left, boundingRect.right)
  const vertBounds = isBetween(boundingRect.top, boundingRect.bottom)
  return fullyContained
    ? horizBounds(targetRect.left) &&
        horizBounds(targetRect.right) &&
        vertBounds(targetRect.top) &&
        vertBounds(targetRect.bottom)
    : (horizBounds(targetRect.left) &&
        (vertBounds(targetRect.top) || vertBounds(targetRect.bottom))) ||
        (horizBounds(targetRect.right) &&
          (vertBounds(targetRect.top) || vertBounds(targetRect.bottom))) ||
        (vertBounds(targetRect.top) &&
          (horizBounds(targetRect.left) || horizBounds(targetRect.right))) ||
        (vertBounds(targetRect.bottom) &&
          (horizBounds(targetRect.left) || horizBounds(targetRect.right)))
}

export const inViewport = ({
  threshold = 0,
  offsetVert = window.innerHeight * threshold,
  offsetHoriz = window.innerWidth * threshold,
  boundingLeft,
  boundingRight,
  isFullyContained = false,
} = {}) => (element) => {
  if (!element) {
    return false
  }
  if (!element.offsetParent) {
    return true
  }
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
      right: isNaN(boundingRight) ? horizMax : boundingRight,
    },
    fullyContained: isFullyContained,
  })
}
