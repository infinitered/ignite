// https://github.com/airbnb/enzyme/blob/master/docs/api/shallow.md
import test from 'ava'
import React from 'react'
import DrawerButton from '../../App/Components/DrawerButton'
import { shallow } from 'enzyme'

const wrapper = shallow(<DrawerButton onPress={() => {}} text='hi' />)

test('component exists', (t) => {
  t.is(wrapper.length, 1) // exists
})

test('component structure', (t) => {
  t.is(wrapper.name(), 'TouchableOpacity') // the right root component
  t.is(wrapper.children().length, 1) // has 1 child
  t.is(wrapper.children().first().name(), 'Text') // that child is Text
})

test('onPress', (t) => {
  let i = 0
  const onPress = () => i++
  const wrapperPress = shallow(<DrawerButton onPress={onPress} text='hi' />)

  t.is(wrapperPress.prop('onPress'), onPress) // uses the right handler
  t.is(i, 0)
  wrapperPress.simulate('press')
  t.is(i, 1)
})
