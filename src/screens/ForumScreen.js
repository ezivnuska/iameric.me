import React from 'react'
import { Screen } from './components'
import { Forum } from '@modules'
import { ForumContextProvider } from '@forum'
    
const ForumScreen = props => (
    <Screen secure {...props}>
        
        <ForumContextProvider>
            <Forum />
        </ForumContextProvider>
        
    </Screen>
)

export default ForumScreen