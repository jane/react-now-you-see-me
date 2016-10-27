import React from 'react'
import { shallow } from 'enzyme'
import InView from './InView'

test('calls the child function when InView is in view', () => {
  const inView = shallow(
    <InView>
      {() => (<p>In View</p>)}
    </InView>
  )

  expect(inView.text()).toEqual('In View')
})
