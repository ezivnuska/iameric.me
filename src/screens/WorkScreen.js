import React from 'react'
import { Screen } from './components'
import { Heading } from '@components'
import { Resume } from '@modules'

export default props => (
    <Screen
        {...props}
        secure={false}
    >

        <Heading title='Work' />

        <Resume />

    </Screen>
)