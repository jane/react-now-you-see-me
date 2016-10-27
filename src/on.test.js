import on from './on'

beforeAll(() => {
  document.body.innerHTML = `
    <main>
      <div>
        <p>
          <span class='el'></span>
        </p>
      </div>
    </main>
  `
})

test('adds a click event listener to an element', () => {
  let hello = ''

  const el = document.querySelector('.el')
  on('click')(el)(() => hello = 'hello')
  el.click()
  expect(hello).toBe('hello')
})

test('returns a function that removes the event listener', () => {
  let hello = ''

  const el = document.querySelector('.el')
  const off = on('click')(el)(() => hello = 'hello')
  off()
  el.click()

  expect(hello).toBe('')
})
