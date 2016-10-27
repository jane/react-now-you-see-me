import React, { Component } from 'react'
import {default as debounceFn} from 'lodash/debounce'
import { func, number } from 'propTypes'
import isInView from './isInView'
import getScrollParent from './getScrollParent'
import on from './on'

const onScroll = on('scroll')
const onWindowScroll = onScroll(window)

export default class InView extends Component {
  static propTypes = {
    children: func.isRequired,
    debounce: number,
    threshold: number
  }

  static defaultProps = {
    debounce: 250,
    threshold: 0
  }

  constructor (props) {
    super(props)
    this.state = { isInView: false }
  }

  componentDidMount () {
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
    return nextState.isInView && !this.state.isInView
  }

  onDismount = ((fns) => (fn) => {
    if (fns) {
      fns.push(fn)
    } else {
      fns.map(fn => fn())
    }
  })([])

  setRef = (ref) => { this._ref = ref }

  checkIsInView = debounceFn(
    () => isInView(this._ref, this.props.threshold) && this.setState({ isInView: true }),
    this.props.debounce
  )

  render () {
    return (
      <div ref={this.setRef}>
        {this.props.children(this.state.isInView)}
      </div>
    )
  }
}
