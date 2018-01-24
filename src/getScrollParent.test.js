import getScrollParent from './getScrollParent'
import test from 'tape'

test('gets scroll parent when overflow is `auto`', (t) => {
  document.body.innerHTML = `
    <main style="overflow: auto">
      <div>
        <p>
          <span class='el'></span>
        </p>
      </div>
    </main>
  `

  const el = document.querySelector('.el')
  const scrollParent = document.querySelector('main')

  t.equal(getScrollParent(el), scrollParent)
})

test('gets scroll parent when overflow is `scroll`', (t) => {
  document.body.innerHTML = `
    <main style="overflow: scroll">
      <div>
        <p>
          <span class='el'></span>
        </p>
      </div>
    </main>
  `

  const el = document.querySelector('.el')
  const scrollParent = document.querySelector('main')

  t.equal(getScrollParent(el), scrollParent)
})

test('gets window when no scroll parent can be found', (t) => {
  document.body.innerHTML = `
    <main>
      <div>
        <p>
          <span class='el'></span>
        </p>
      </div>
    </main>
  `

  const el = document.querySelector('.el')
  const scrollParent = window

  t.equal(getScrollParent(el), scrollParent)
})
