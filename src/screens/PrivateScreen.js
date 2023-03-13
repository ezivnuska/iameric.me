import React from 'react'
import {
    View
} from 'react-native-web'
import { SecureScreen } from '.'
import { Sandbox } from '../components'

const PrivateScreen = props => (
    <SecureScreen { ...props }>
        <View>
            <Sandbox />
        </View>
    </SecureScreen>
)

export default PrivateScreen