import React from 'react'
import { SecureScreen } from '.'
import {
    EntryDisplay,
} from '../components'

const PrivateScreen = ({ navigation, ...props }) => (
    <SecureScreen { ...props }>
        <EntryDisplay />
    </SecureScreen>
)

export default PrivateScreen