export default (evtName) => (el) => (fn) => {
  el.addEventListener(evtName, fn)
  return () => {
    el.cancel && el.cancel()
    el.removeEventListener(evtName, fn)
  }
}
