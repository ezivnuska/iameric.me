import React from 'react'
import { Screen } from './components'
import { Heading } from '@components'
import { Play } from '@modules'

const PlayScreen = props => (
    <Screen {...props}>

        <Heading title='Play' />
        
        <Play />

    </Screen>
)

export default PlayScreen