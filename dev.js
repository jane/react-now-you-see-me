import React, { Component } from 'react'
import { render } from 'react-dom'
import InView from './src'
import { bool, number } from 'prop-types'
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
  '#eaa30a'
]

class Box extends Component {
  static propTypes = {
    isInView: bool,
    i: number.isRequired
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.isInView && !this.props.isInView) {
      window.document.title = this.props.i + 1
    }
  }

  render () {
    const { i } = this.props
    return (
      <div className="box" style={{ backgroundColor: colors[i] }}>
        <h3><code>location.title</code> should now be {i + 1}</h3>
      </div>
    )
  }
}

class Demo extends Component {
  state = { docs: '' }

  componentWillMount () {
    window.fetch('https://raw.githubusercontent.com/jane/react-now-you-see-me/master/README.md')
      .then((a) => a.text())
      .then((t) => {
        this.setState({ docs: marked(t) })
      })
      .catch(console.error)
  }

  render () {
    return (
      <div className="wrapper">
        <div dangerouslySetInnerHTML={{ __html: this.state.docs }} className="md" />
        <div style={{ height: 'calc(100vh * 10)' }}>
          {Array(10).fill().map((_, i) =>
            <InView key={i} threshold={0}>
              {(isInView) => <Box i={i} isInView={isInView} />}
            </InView>
          )}
        </div>
      </div>
    )
  }
}

render(<Demo />, document.getElementById('root'))
