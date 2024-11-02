import React from 'react'
import { Screen } from './components'
import { Forum } from '@modules'
import { ForumContextProvider } from '@forum'
    
export default props => (
    <Screen {...props}>
        <ForumContextProvider>
            <Forum />
        </ForumContextProvider>
        
    </Screen>
)