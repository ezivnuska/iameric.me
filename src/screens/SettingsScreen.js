import React from 'react'
import { SecureScreen } from './'
import {
    Settings,
} from '../components'

const SettingsScreen = props => (
    <SecureScreen { ...props }>
        <Settings />
    </SecureScreen>
)

export default SettingsScreen