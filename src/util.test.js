import { inViewport, on } from './util'

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

  it.skip('determins element to not be within threshold of view', () => {
    expect(
      inViewport()(
        mockEl({ top: -500, bottom: -401, left: 500, right: 500 }),
        undefined,
        0.1
      )
    ).toBe(false)
    expect(
      inViewport()(
        mockEl({ top: 1500, bottom: 1600, left: 500, right: 500 }),
        undefined,
        0.1
      )
    ).toBe(false)
    expect(
      inViewport()(
        mockEl({ top: 500, bottom: 600, left: -500, right: -400 }),
        undefined,
        0.1
      )
    ).toBe(false)
    expect(
      inViewport()(
        mockEl({ top: 500, bottom: 600, left: 1500, right: 1600 }),
        undefined,
        0.1
      )
    ).toBe(false)
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
