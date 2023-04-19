import React from 'react'
import {
    View
} from 'react-native'
import { SecureScreen } from '.'
import {
    EntryDisplay,
} from '../components'

const PrivateScreen = ({ navigation, ...props }) => (
    <SecureScreen { ...props }>
        <View>
            <EntryDisplay />
        </View>
    </SecureScreen>
)

export default PrivateScreen