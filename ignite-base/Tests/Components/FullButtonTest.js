import test from 'ava'
import React from 'react'
import FullButton from '../../App/Components/FullButton'
import { shallow } from 'enzyme'

test('component structure', t => {
  const wrapper = shallow(<FullButton onPress={() => {}} text='hi' />)

  t.is(wrapper.name(), 'TouchableOpacity') // the right root component
  t.is(wrapper.children().length, 1) // has 1 child
  t.is(wrapper.children().first().name(), 'Text') // that child is Text
})

test('onPress', t => {
  let i = 0 // i guess i could have used sinon here too... less is more i guess
  const onPress = () => i++
  const wrapper = shallow(<FullButton onPress={onPress} text='hi' />)

  t.is(wrapper.prop('onPress'), onPress) // uses the right handler
  t.is(i, 0)
  wrapper.simulate('press')
  t.is(i, 1)
})
