import React from 'react'
import { View } from 'react-native'
import { Screen } from './components'
import { Feed } from '@modules'
import { FeedContextProvider } from '@feed'
    
const FeedScreen = props => (
    <Screen {...props}>

        <View style={{ flexGrow: 1 }}>

            <FeedContextProvider>
                <Feed />
            </FeedContextProvider>
        </View>
        
    </Screen>
)

export default FeedScreen