import React from 'react'
import { SecureScreen } from '.'
import {
    EntryDisplay,
    ScreenContent,
} from '../components'

const PrivateScreen = ({ navigation, ...props }) => (
    <SecureScreen { ...props }>
        <ScreenContent>
            <EntryDisplay />
        </ScreenContent>
    </SecureScreen>
)

export default PrivateScreen