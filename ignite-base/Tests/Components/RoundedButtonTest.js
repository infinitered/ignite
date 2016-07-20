// https://github.com/airbnb/enzyme/blob/master/docs/api/shallow.md
import test from 'ava'
import React from 'react'
import RoundedButton from '../../App/Components/RoundedButton'
import { shallow } from 'enzyme'

test('component exists', t => {
  const wrapper = shallow(<RoundedButton onPress={() => {}} text='hi' />)
  t.is(wrapper.length, 1) // exists
})

test('component structure', t => {
  const wrapper = shallow(<RoundedButton onPress={() => {}} text='hi' />)

  t.is(wrapper.name(), 'TouchableOpacity') // the right root component
  t.is(wrapper.children().length, 1) // has 1 child
  t.is(wrapper.children().first().name(), 'Text') // that child is Text
})

test('onPress', t => {
  let i = 0 // i guess i could have used sinon here too... less is more i guess
  const onPress = () => i++
  const wrapper = shallow(<RoundedButton onPress={onPress} text='hi' />)

  t.is(wrapper.prop('onPress'), onPress) // uses the right handler
  t.is(i, 0)
  wrapper.simulate('press')
  t.is(i, 1)
})

test('renders children text when passed', t => {
  const wrapper = shallow(<RoundedButton onPress={() => {}}>Howdy</RoundedButton>)
  t.is(wrapper.children().length, 1) // has 1 child
  t.is(wrapper.children().first().name(), 'Text') // that child is Text
})
