import React from 'react'
import { Screen } from './components'
import { Heading } from '@components'
import { Play } from '@modules'

export default props => (
    <Screen
        {...props}
        secure={false}
    >

        <Heading title='Play' />
        
        <Play />

    </Screen>
)