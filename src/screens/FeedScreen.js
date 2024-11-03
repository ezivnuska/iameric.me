import React from 'react'
import { Screen } from './components'
import { Feed } from '@modules'
import { FeedContextProvider } from '@feed'
    
const FeedScreen = props => (
    <Screen secure {...props}>

        <FeedContextProvider>
            <Feed />
        </FeedContextProvider>
        
    </Screen>
)

export default FeedScreen