import React from 'react'
import { Screen } from './components'
import { ScreenHeading } from '@components'
import { Resume } from '@modules'

const WorkScreen = props => (
    <Screen
        {...props}
        title='Work'
    >

        <ScreenHeading
            label='Work'
        />

        <Resume />

    </Screen>
)

export default WorkScreen