import React from 'react'
import {
    SecureScreen,
    UserModule,
} from '@components'

export default ({ navigation }) => (
    <SecureScreen navigation={navigation}>
        <UserModule />
    </SecureScreen>
)