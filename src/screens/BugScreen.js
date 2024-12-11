import React from 'react'
import { Bugs, Screen } from '@components'
    
const BugScreen = props => (
    <Screen secure {...props}>
        <Bugs {...props} />
    </Screen>
)

export default BugScreen