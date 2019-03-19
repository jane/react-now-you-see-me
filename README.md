# react-now-you-see-me

A React component for determining when an element is within a given threshold of the viewport, horizontally.

* [Demo](https://jane.github.io/react-now-you-see-me)
* [Repo](https://github.com/jane/react-now-you-see-me)

[![npm version](https://img.shields.io/npm/v/react-now-you-see-me.svg)](https://npm.im/react-now-you-see-me) [![CircleCI](https://circleci.com/gh/jane/react-now-you-see-me.svg?style=svg)](https://circleci.com/gh/jane/react-now-you-see-me) [![Known Vulnerabilities](https://snyk.io/test/github/jane/react-now-you-see-me/badge.svg)](https://snyk.io/test/github/jane/react-now-you-see-me) [![Coverage Status](https://coveralls.io/repos/github/jane/react-now-you-see-me/badge.svg?branch=master)](https://coveralls.io/github/jane/react-now-you-see-me?branch=master)

--------

### Installation

`npm i react-now-you-see-me`

You'll also need React and ReactDOM peer dependencies: `npm i react react-dom`.

### Usage

```jsx
import * as React from 'react'
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
