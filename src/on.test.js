import on from './on'
import test from 'tape'

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
