import React from 'react'
import { fireEvent, render, wait } from 'react-testing-library'
import InView from './in-view'
import 'dom-testing-library/extend-expect'

// Patch JSDOM to so that offsetParent works. See https://github.com/jsdom/jsdom/issues/1261#issuecomment-362928131
Object.defineProperty(HTMLElement.prototype, 'offsetParent', {
  get() {
    return this.parentNode
  },
})

const boundingClientRect = ({
  top = 0,
  bottom = 0,
  left = 0,
  right = 0,
} = {}) => ({
  top,
  bottom,
  left,
  right,
  width: right - left,
  height: bottom - top,
})

const renderInView = (props) => {
  const ops = render(
    <InView {...props}>
      {(inView) => <div data-testid="box">{inView ? 'true' : 'false'}</div>}
    </InView>
  )
  const box = ops.getByTestId('box')
  box.getBoundingClientRect = jest.fn().mockReturnValue(boundingClientRect())
  return {
    ...ops,
    getBox: () => box,
    setBoundingRect: (params) => {
      box.getBoundingClientRect = jest
        .fn()
        .mockReturnValue(boundingClientRect(params))
      fireEvent.scroll(window)
    },
  }
}

test('renders as true when visible', async () => {
  const { getBox, setBoundingRect } = renderInView()
  setBoundingRect({
    top: 0,
    bottom: 100,
    right: 100,
  })
  await wait(() => expect(getBox()).toHaveTextContent('true'))
})

test('renders as false when not in document', async () => {
  const { getBox, setBoundingRect } = renderInView()
  setBoundingRect({
    top: -100,
    bottom: 0,
    right: 100,
  })
  await wait(() => expect(getBox()).toHaveTextContent('false'))
})

test('renders as true when within boundingLeft and boundingRight', async () => {
  const { getBox, setBoundingRect } = renderInView({
    boundingLeft: 100,
    boundingRight: 300,
  })
  setBoundingRect({
    top: 0,
    bottom: 100,
    left: 100,
    right: 300,
  })
  await wait(() => expect(getBox()).toHaveTextContent('true'))
})

test('renders as false when outside of boundingLeft', async () => {
  const { getBox, setBoundingRect } = renderInView({
    boundingLeft: 100,
    boundingRight: 300,
  })
  setBoundingRect({
    top: 0,
    bottom: 100,
    left: 0,
    right: 300,
  })
  await wait(() => expect(getBox()).toHaveTextContent('false'))
})

test('renders as false when outside of boundingRight', async () => {
  const { getBox, setBoundingRect } = renderInView({
    boundingLeft: 100,
    boundingRight: 300,
  })
  setBoundingRect({
    top: 0,
    bottom: 100,
    left: 100,
    right: 301,
  })
  await wait(() => expect(getBox()).toHaveTextContent('false'))
})
