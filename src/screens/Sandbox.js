import React from 'react'
import { Screen } from './components'
import { Touch } from '@components'

const Sandbox = props => {
    
    return (
        <Screen full secure {...props}>
            <Touch />
        </Screen>
    )
}

export default Sandbox