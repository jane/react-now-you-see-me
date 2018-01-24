import { inViewport as isInView, on } from './util'
import test from 'tape'

test('inViewport', (t) => {
  /*
  global.window = {
    innerHeight: 1000,
    innerWidth: 1000
  }
  */

  const mockEl = ({ top, bottom, left, right }) => ({
    getBoundingClientRect: () => ({ top, bottom, left, right })
  })

  test('determins element to be within view', () => {
    t.true(isInView(mockEl({ top: 500, bottom: 600, left: 500, right: 500 })))
  })

  test('determins element to be within threshold of view', () => {
    t.true(isInView(mockEl({ top: -300, bottom: 100, left: 500, right: 600 }), 100))
  })

  test('determins element to not be within threshold of view', () => {
    t.false(isInView(mockEl({ top: -500, bottom: -400, left: 500, right: 500 }), 100))
    t.false(isInView(mockEl({ top: 1500, bottom: 1600, left: 500, right: 500 }), 100))
    t.false(isInView(mockEl({ top: 500, bottom: 600, left: -500, right: -400 }), 100))
    t.false(isInView(mockEl({ top: 500, bottom: 600, left: 1500, right: 1600 }), 100))
  })
})

test('isElementInViewport', (t) => {
  // jsdom window dimentions:
  // innerHeight: 1000
  // innerWidth: 1000

  const mockEl = ({ top, bottom, left, right }) => ({
    getBoundingClientRect: () => ({
      top,
      bottom,
      left,
      right,
      width: right - left,
      height: bottom - top
    })
  })

  t.test('determins element to be within view', (t) => {
    t.true(isInView(mockEl({ top: 500, bottom: 600, left: 500, right: 500 })))
  })

  t.test('determins element to be within threshold of view', (t) => {
    t.true(isInView(mockEl({ top: -300, bottom: 100, left: 500, right: 600 }), undefined, 10))
  })

  t.test('determins element to not be within threshold of view', (t) => {
    t.false(isInView(mockEl({ top: -500, bottom: -401, left: 500, right: 500 }), undefined, 0.1))
    t.false(isInView(mockEl({ top: 1500, bottom: 1600, left: 500, right: 500 }), undefined, 0.1))
    t.false(isInView(mockEl({ top: 500, bottom: 600, left: -500, right: -400 }), undefined, 0.1))
    t.false(isInView(mockEl({ top: 500, bottom: 600, left: 1500, right: 1600 }), undefined, 0.1))
  })
})

test('adds a click event listener to an element', (t) => {
  document.body.innerHTML = `
    <main>
      <div>
        <p>
          <span class='el'></span>
        </p>
      </div>
    </main>
  `

  let hello = ''

  const el = document.querySelector('.el')
  on('click')(el)(() => { hello = 'hello' })
  el.click()

  t.equal(hello, 'hello')
})

test('returns a function that removes the event listener', (t) => {
  document.body.innerHTML = `
    <main>
      <div>
        <p>
          <span class='el'></span>
        </p>
      </div>
    </main>
  `

  let hello = ''

  const el = document.querySelector('.el')
  const off = on('click')(el)(() => { hello = 'hello' })
  off()
  el.click()

  t.equal(hello, '')
})
