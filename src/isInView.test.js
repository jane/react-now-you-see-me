import isInView from './isInView'
import test from 'tape'

const window = {
  innerHeight: 1000,
  innerWidth: 1000
}

const mockEl = ({ top, bottom, left, right }) => ({
  getBoundingClientRect: () => ({ top, bottom, left, right })
})

test('determins element to be within view', (t) => {
  t.true(isInView(mockEl({ top: 500, bottom: 600, left: 500, right: 500 })))
})

test('determins element to be within threshold of view', (t) => {
  t.true(isInView(mockEl({ top: -300, bottom: 100, left: 500, right: 600 }), 100))
})

test('determins element to not be within threshold of view', (t) => {
  t.false(isInView(mockEl({ top: -500, bottom: -400, left: 500, right: 500 }), 100))
  t.false(isInView(mockEl({ top: 1500, bottom: 1600, left: 500, right: 500 }), 100))
  t.false(isInView(mockEl({ top: 500, bottom: 600, left: -500, right: -400 }), 100))
  t.false(isInView(mockEl({ top: 500, bottom: 600, left: 1500, right: 1600 }), 100))
})
