import test from 'ava'
import React from 'react'
import { Text } from 'react-native'
import AlertMessage from '../../App/Components/AlertMessage'
import { shallow } from 'enzyme'

// Basic wrapper
const wrapper = shallow(<AlertMessage title='howdy' />)

test('component exists', (t) => {
  t.is(wrapper.length, 1) // exists
})

test('component structure', (t) => {
  t.is(wrapper.name(), 'View')
  t.is(wrapper.children().length, 1) // has 1 child
  t.is(wrapper.children().first().name(), 'View') // that child is View

  const subview = wrapper.children().first()
  t.is(subview.children().length, 1)
})

test('Has text and set properly', (t) => {
  t.is(wrapper.containsMatchingElement(<Text>HOWDY</Text>), true)
})

test('style props are passed to top view', (t) => {
  const withStyle = shallow(<AlertMessage title='howdy' style={{color: 'red'}} />)
  t.is(withStyle.props().style[1].color, 'red')
})

test('show false', (t) => {
  const hidden = shallow(<AlertMessage title='howdy' show={false} />)
  t.is(hidden.children().length, 0)
})
