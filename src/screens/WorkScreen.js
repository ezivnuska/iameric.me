import React from 'react'
import { Screen, TextHeading } from '@components'
import Resume from '@components/Resume'

const WorkScreen = props => (
    <Screen {...props}>

        <TextHeading>Work</TextHeading>

        <Resume />

    </Screen>
)

export default WorkScreen