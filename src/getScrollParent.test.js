import getScrollParent from './getScrollParent'

test('gets scroll parent when overflow is `auto`', () => {
  document.body.innerHTML = `
    <main style="overflow: auto">
      <div>
        <p>
          <span class='el'></span>
        </p>
      </div>
    </main>
  `;

  const el = document.querySelector('.el')
  const scrollParent = document.querySelector('main')
  expect(getScrollParent(el))
  .toBe(scrollParent)
})

test('gets scroll parent when overflow is `scroll`', () => {
  document.body.innerHTML = `
    <main style="overflow: scroll">
      <div>
        <p>
          <span class='el'></span>
        </p>
      </div>
    </main>
  `;

  const el = document.querySelector('.el')
  const scrollParent = document.querySelector('main')
  expect(getScrollParent(el))
  .toBe(scrollParent)
})

test('gets window when no scroll parent can be found', () => {
  document.body.innerHTML = `
    <main>
      <div>
        <p>
          <span class='el'></span>
        </p>
      </div>
    </main>
  `;

  const el = document.querySelector('.el')
  const scrollParent = window
  expect(getScrollParent(el))
  .toBe(scrollParent)
})
