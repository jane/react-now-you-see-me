/* eslint-disable unicorn/no-abusive-eslint-disable */

import * as React from 'react'
import { render } from 'react-dom'
import InView from './src'
import { bool, func, number } from 'prop-types'
import marked from 'marked'

const colors = [
  '#f47467',
  '#95dd12',
  '#24c0ed',
  '#0af1ba',
  '#decced',
  '#bdf6c0',
  '#e7ee28',
  '#e08388',
  '#62fd1e',
  '#eaa30a',
]

class Box extends React.Component {
  static propTypes = {
    isInView: bool,
    i: number.isRequired,
    updateNumber: func.isRequired,
  }

  // eslint-disable-next-line
  componentWillReceiveProps(nextProps) {
    if (nextProps.isInView && !this.props.isInView) {
      this.props.updateNumber(this.props.i + 1)
    }
  }

  render() {
    const { i } = this.props
    return (
      <section className="box" style={{ backgroundColor: colors[i] }}>
        <h3>slide number {i + 1}</h3>
      </section>
    )
  }
}

class Demo extends React.Component {
  state = { docs: '', n: 1 }

  // eslint-disable-next-line
  componentWillMount() {
    window
      .fetch(
        'https://raw.githubusercontent.com/jane/react-now-you-see-me/master/README.md'
      )
      .then((a) => a.text())
      .then((t) => {
        this.setState({ docs: marked(t) })
      })
      // eslint-disable-next-line no-console
      .catch(console.error)
  }

  updateNumber = (n) => {
    this.setState({ n })
  }

  render() {
    return (
      <main className="wrapper">
        <article
          dangerouslySetInnerHTML={{ __html: this.state.docs }}
          className="md"
        />
        <h3>slide number {this.state.n} is in view</h3>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            overflow: 'scroll',
          }}
        >
          {new Array(10).fill().map((_, i) => (
            <InView key={i} threshold={0}>
              {(isInView) => (
                <Box
                  updateNumber={this.updateNumber}
                  i={i}
                  isInView={isInView}
                />
              )}
            </InView>
          ))}
        </div>
      </main>
    )
  }
}

render(<Demo />, document.getElementById('root'))
