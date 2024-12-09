import React from 'react'
import { Screen } from '@components'
import { Feed } from '@components'
import { FeedContextProvider } from '@context'
    
const FeedScreen = props => (
    <Screen secure {...props}>

        <FeedContextProvider>
            <Feed {...props} />
        </FeedContextProvider>
        
    </Screen>
)

export default FeedScreen