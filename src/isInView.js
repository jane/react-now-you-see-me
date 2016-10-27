export default (element, threshold = 0) => {
  if (!element) return false
  const bounds = element.getBoundingClientRect()

  return element.offsetParent !== null &&
    bounds.bottom >= -threshold && bounds.top <= (window.innerHeight + threshold) &&
    bounds.right >= -threshold && bounds.left <= (window.innerWidth + threshold)
}
