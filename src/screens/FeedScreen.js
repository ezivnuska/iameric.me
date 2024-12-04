import React from 'react'
import { Screen } from './components'
import Feed, { FeedContextProvider } from '@components/Feed'
    
const FeedScreen = props => (
    <Screen secure {...props}>

        <FeedContextProvider>
            <Feed {...props} />
        </FeedContextProvider>
        
    </Screen>
)

export default FeedScreen