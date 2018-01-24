# react-in-view

A react component for determining when it is within a given threshold of the viewport

--------

### Installation

`npm i @janecorp/react-in-view`

You'll also need React and ReactDOM peer dependencies: `npm i react react-dom`.

### Usage

```jsx
import React from 'react'
import InView from '@janecorp/react-in-view'

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
