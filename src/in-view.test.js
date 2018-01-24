import React from 'react'
import { shallow } from 'enzyme'
import InView from './InView'
import test from 'tape'

test('calls the child function when InView is in view', (t) => {
  const inView = shallow(
    <InView>
      {() => (<p>In View</p>)}
    </InView>
  )

  t.equal(inView.text(), 'In View')
})
