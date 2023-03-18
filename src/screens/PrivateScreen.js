import React from 'react'
import {
    View
} from 'react-native-web'
import { SecureScreen } from '.'
import {
    Sandbox,
    UserDisplay,
} from '../components'

const PrivateScreen = props => (
    <SecureScreen { ...props }>
        <View>
            <Sandbox />
            <UserDisplay />
        </View>
    </SecureScreen>
)

export default PrivateScreen