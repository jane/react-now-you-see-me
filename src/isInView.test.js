import isInView from './isInView'

const window = {
  innerHeight: 1000,
  innerWidth: 1000
}

const mockEl = ({ top, bottom, left, right }) => ({
  getBoundingClientRect: () => ({ top, bottom, left, right })
})

test('determins element to be within view', () => {
  expect(isInView(mockEl({ top: 500, bottom: 600, left: 500, right: 500 })))
  .toBe(true)
})

test('determins element to be within threshold of view', () => {
  expect(isInView(mockEl({ top: -300, bottom: 100, left: 500, right: 600 }), 100))
  .toBe(true)
})

test('determins element to not be within threshold of view', () => {
  expect(isInView(mockEl({ top: -500, bottom: -400, left: 500, right: 500 }), 100))
  .toBe(false)

  expect(isInView(mockEl({ top: 1500, bottom: 1600, left: 500, right: 500 }), 100))
  .toBe(false)

  expect(isInView(mockEl({ top: 500, bottom: 600, left: -500, right: -400 }), 100))
  .toBe(false)

  expect(isInView(mockEl({ top: 500, bottom: 600, left: 1500, right: 1600 }), 100))
  .toBe(false)
})
