import React from 'react'
import { SecureScreen } from './'
import {
    Settings,
    ScreenContent,
} from '../components'

const SettingsScreen = props => (
    <SecureScreen { ...props }>
        <ScreenContent>
            <Settings />
        </ScreenContent>
    </SecureScreen>
)

export default SettingsScreen