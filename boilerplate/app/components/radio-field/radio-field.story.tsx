import * as React from 'react'
import { storiesOf } from '@storybook/react-native'
import { StoryScreen, Story, UseCase } from '../../../storybook/views'
import { color } from '../../theme'
import { RadioField } from './radio-field'

storiesOf('RadioField', module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add('Style Presets', () => (
    <Story>
      <UseCase
        text="Primary"
        usage="The primary."
      >
        <RadioField style={{ backgroundColor: color.angry }} />
      </UseCase>
    </Story>
  ))
