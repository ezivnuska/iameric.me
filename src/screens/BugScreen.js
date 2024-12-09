import React from 'react'
import { Bugs, Screen } from '@components'
import { BugContextProvider } from '@context'
    
const BugScreen = props => (
    <Screen secure {...props}>
        
        <BugContextProvider>
            <Bugs {...props} />
        </BugContextProvider>
        
    </Screen>
)

export default BugScreen