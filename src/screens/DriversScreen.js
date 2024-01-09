import React from 'react'
import {
    SecureScreen,
    DriverModule,
} from '@components'

export default ({ navigation }) => (
    <SecureScreen navigation={navigation}>
        <DriverModule />
    </SecureScreen>
)