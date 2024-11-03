import React from 'react'
import { Screen } from './components'
import { Map } from '@modules'

const MapScreen = props => (
    <Screen secure {...props}>
        <Map />
    </Screen>
)

export default MapScreen