# react-now-you-see-me

A react component for determining when it is within a given threshold of the viewport.

* [demo](https://jane.github.io/react-now-you-see-me)
* [npm](https://npmjs.com/package/react-now-you-see-me)
* [repo](https://github.com/jane/react-now-you-see-me)

## *PRERELEASE*

This library might not be correct yet, use with care.

--------

### Installation

`npm i react-now-you-see-me`

You'll also need React and ReactDOM peer dependencies: `npm i react react-dom`.

### Usage

```jsx
import React from 'react'
import InView from 'react-now-you-see-me'

const Foo = (props) => (
  <div>
    <InView threshold={0} boundingLeft={100} boundingRight={100}>
      {(isInView) =>
        isInView
          ? <span>I am totally in view right now, awesome!</span>
          : <span>You can't see me :(</span>
      }
    </InView>
  </div>
)
```

### LICENSE

[MIT](./LICENSE.md)
