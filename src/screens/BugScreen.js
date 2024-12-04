import React from 'react'
import { Screen } from './components'
import Bugs, { BugContextProvider } from '@components/Bugs'
    
const BugScreen = props => (
    <Screen secure {...props}>
        
        <BugContextProvider>
            <Bugs {...props} />
        </BugContextProvider>
        
    </Screen>
)

export default BugScreen