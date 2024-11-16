import React from 'react'
import { Screen } from './components'
// import { Heading } from '@components'
import { Resume } from '@modules'

const WorkScreen = props => (
    <Screen
        {...props}
        title='Work'
    >

        {/* <Heading title='Work' /> */}

        <Resume />

    </Screen>
)

export default WorkScreen