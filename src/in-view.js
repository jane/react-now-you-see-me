import React from 'react'
import { findDOMNode } from 'react-dom'
import debounceFn from 'lodash.debounce'
import { func, number, bool } from 'prop-types'
import { on, inViewport } from './util'

const onWindowScroll = on('scroll', { capture: true, passive: true })(window)
const isProd = process && process.env && process.env.NODE_ENV === 'production'

export default class InView extends React.Component {
  static propTypes = {
    children: func.isRequired,
    boundingLeft: number,
    boundingRight: number,
    debounce: number,
    threshold: number,
    once: bool,
    horizontally: bool
  }

  static defaultProps = {
    debounce: 250,
    threshold: 0,
    once: false
  }

  mounted = false
  state = { isInView: false, hasUpdated: false }

  componentDidMount () {
    this.mounted = true
    this._ref = findDOMNode(this)
    this.isInViewport = inViewport({
      threshold: this.props.threshold,
      boundingLeft: this.props.boundingLeft,
      boundingRight: this.props.boundingRight,
      requireEntireElementInViewport: true
    })
    this.checkIsInView()
    this.scrollUnsubscribe = onWindowScroll(this.checkIsInViewDebounced)
  }

  componentWillUnmount () {
    this.mounted = false
    this.scrollUnsubscribe()
  }

  componentWillReceiveProps (nextProps) {
    const { threshold, debounce } = nextProps
    this.isInViewport = inViewport({ threshold, requireEntireElementInViewport: true })
    this.checkIsInViewDebounced = debounceFn(this.checkIsInView, debounce)
  }

  checkIsInView = () => {
    if (!this.mounted) return
    if (this.props.once && this.state.hasUpdated) return
    const { threshold } = this.props
    if (threshold > 10 && isProd) {
      console.warn(`High InView threshold: "${threshold}". Threshold is multiplied by the viewport dimensions!`)
    }

    const wasInView = this.state.isInView
    const isNowInView = this.isInViewport(this._ref)

    if (wasInView !== isNowInView) {
      this.setState(() => ({
        isInView: isNowInView,
        hasUpdated: true
      }))
    }
  }

  checkIsInViewDebounced = debounceFn(this.checkIsInView, this.props.debounce)
  render () {
    return this.props.children(this.state.isInView)
  }
}
