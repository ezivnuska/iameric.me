import React from 'react'
import { Resume, Screen, TextHeading } from '@components'

const WorkScreen = props => (
    <Screen {...props}>

        <TextHeading>Work</TextHeading>

        <Resume />

    </Screen>
)

export default WorkScreen