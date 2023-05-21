import React from 'react'
import { Screen } from './'
import {
    Settings,
} from '../components'

const SettingsScreen = props => (
    <Screen { ...props }>
        <Settings />
    </Screen>
)

export default SettingsScreen