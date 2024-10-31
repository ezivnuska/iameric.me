import React from 'react'
import { View } from 'react-native'
import { Screen } from './components'
import { Forum } from '@modules'
import { ForumContextProvider } from '@forum'
    
export default props => (
    <Screen {...props}>

        <View style={{ flexGrow: 1 }}>

            <ForumContextProvider>
                <Forum />
            </ForumContextProvider>
        </View>
        
    </Screen>
)