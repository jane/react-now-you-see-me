import { inViewport, isBoundingClientRectInRange, on } from './util'

const toRect = (value) => {
  const [top, right, bottom, left] = value.split(',').map(Number)
  return { top, right, bottom, left }
}
const FULL_SCREEN = '0,1000,1000,0'
test.each`
  target                 | bounding             | fullyContained | expected
  ${'100,200,200,100'}   | ${FULL_SCREEN}       | ${true}        | ${true}
  ${'500,500,600,400'}   | ${FULL_SCREEN}       | ${true}        | ${true}
  ${'-300,600,100,500'}  | ${FULL_SCREEN}       | ${true}        | ${false}
  ${'100,200,200,100'}   | ${'100,400,200,300'} | ${false}       | ${false}
  ${'-300,600,100,500'}  | ${FULL_SCREEN}       | ${false}       | ${true}
  ${'900,100,1100,-100'} | ${FULL_SCREEN}       | ${false}       | ${true}
  ${'900,1100,1100,900'} | ${FULL_SCREEN}       | ${false}       | ${true}
  ${'-100,100,100,-100'} | ${FULL_SCREEN}       | ${false}       | ${true}
  ${'-100,1100,100,900'} | ${FULL_SCREEN}       | ${false}       | ${true}
`(
  'returns $expected when target=$target, bounding=$bounding, fullyContained=$fullyContained',
  ({ target, bounding, fullyContained, expected }) => {
    const targetRect = toRect(target)
    const boundingRect = toRect(bounding)
    expect(
      isBoundingClientRectInRange({ targetRect, boundingRect, fullyContained })
    ).toEqual(expected)
  }
)

describe('inViewport', () => {
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
      height: bottom - top,
    }),
  })

  it('determins element to be within view', () => {
    expect(
      inViewport()(mockEl({ top: 500, bottom: 600, left: 500, right: 500 }))
    ).toBe(true)
  })

  it('determins element to be within threshold of view', () => {
    expect(
      inViewport()(
        mockEl({ top: -300, bottom: 100, left: 500, right: 600 }),
        undefined,
        10
      )
    ).toBe(true)
  })
})

describe('on', () => {
  it('adds a click event listener to an element', () => {
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
    on('click')(el)(() => {
      hello = 'hello'
    })
    el.click()

    expect(hello).toBe('hello')
  })

  it('returns a function that removes the event listener', () => {
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
    const off = on('click')(el)(() => {
      hello = 'hello'
    })
    off()
    el.click()

    expect(hello).toBe('')
  })
})
