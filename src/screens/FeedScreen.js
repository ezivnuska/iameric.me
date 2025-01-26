import React from 'react'
import { Screen } from './components'
import { FeedContextProvider } from '@context'
import { Feed } from '@components'
    
const FeedScreen = props => (
    <Screen secure full {...props}>
        
        <FeedContextProvider>
            <Feed {...props} />
        </FeedContextProvider>
        
    </Screen>
)

export default FeedScreen