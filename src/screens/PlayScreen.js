import React from 'react'
import { Screen } from './components'
import { PlayContextProvider } from '@context'
import { Play } from '@components'

const PlayScreen = props => {
    return (
        <Screen {...props}>
                
            <PlayContextProvider>
                <Play {...props} />
            </PlayContextProvider>

        </Screen>
    )
}

export default PlayScreen