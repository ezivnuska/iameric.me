import React from 'react'
import { BugList, Screen } from '@components'
import { BugContextProvider } from '@context'
    
const BugScreen = props => (
    <Screen secure {...props}>
        <BugContextProvider>
            <BugList {...props} />
        </BugContextProvider>
    </Screen>
)

export default BugScreen