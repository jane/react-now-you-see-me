# react-now-you-see-me

A React component for determining when an element is within a given threshold of
the viewport, horizontally.

* [demo](https://jane.github.io/react-now-you-see-me)
* [npm](https://npmjs.com/package/react-now-you-see-me)
* [repo](https://github.com/jane/react-now-you-see-me)

--------

### Installation

`npm i react-now-you-see-me`

You'll also need React and ReactDOM peer dependencies: `npm i react react-dom`.

### Usage

```jsx
import React from 'react'
import InView from 'react-now-you-see-me'

const Foo = (props) => (
  <SomeCarouselComponent>
    {someSlides.map((_, i) =>
      <InView key={i} threshold={0} boundingLeft={100} boundingRight={100}>
        {(isInView) =>
          isInView
            ? <span>I am totally in view right now, awesome!</span>
            : <span>You can't see me :(</span>
        }
      </InView>
    )}
  </SomeCarouselComponent>
)
```

### LICENSE

[MIT](./LICENSE.md)
