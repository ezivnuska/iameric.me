import React from 'react'
import { Screen, ScreenHeader } from '@components'
import Resume from '@components/Resume'

const WorkScreen = props => (
    <Screen {...props}>

        <ScreenHeader label='Work' />

        <Resume />

    </Screen>
)

export default WorkScreen