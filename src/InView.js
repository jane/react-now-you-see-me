import { Component, PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import { default as debounceFn } from 'lodash.debounce'
import isInView from './isInView'
import getScrollParent from './getScrollParent'
import on from './on'

const { func, number, bool } = PropTypes

const onScroll = on('scroll')
const onWindowScroll = onScroll(window)

export default class InView extends Component {
  static propTypes = {
    children: func.isRequired,
    debounce: number,
    threshold: number,
    once: bool
  }

  static defaultProps = {
    debounce: 250,
    threshold: 0,
    once: false
  }

  state = { isInView: false, onced: false }

  componentDidMount () {
    this._ref = findDOMNode(this)
    this.checkIsInView()

    const scrollParent = getScrollParent(this._ref)
    const onScrollParentScroll = onScroll(scrollParent)

    // Register listeners for on/off window scroll
    this.onDismount(onWindowScroll(this.checkIsInView))

    if (scrollParent !== window) {
      // Register listeners for on/off closest scrollable element that isn't window
      this.onDismount(onScrollParentScroll(this.checkIsInView))
    }
  }

  componentWillUnmount () {
    this.onDismount()
  }

  shouldComponentUpdate (_, nextState) {
    return nextState.isInView !== this.state.isInView
  }

  onDismount = ((fns) => (fn) => {
    if (fn) {
      fns.push(fn)
    } else {
      fns.map(fn => fn())
      fns = []
    }
  })([])

  checkIsInView = debounceFn(
    () => {
      if (!this.state.onced) {
        const wasInView = this.state.isInView
        const isNowInView = isInView(this._ref, this.props.threshold)

        if (this._ref && wasInView !== isNowInView) {
          this.setState({ isInView: isNowInView, onced: this.props.once })
        }
      }
    },
    this.props.debounce
  )

  render () {
    // <InView does not render anything beyond what is returned from the child function.
    // It is therefore necessary that the child function returns a renderable react element not including `null`
    // or <InView /> will not call the child function again, as null will never be in the viewport.
    return this.props.children(this.state.isInView)
  }
}
