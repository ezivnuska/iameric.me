import React from 'react'
import {
    SecureScreen,
    VendorModule,
} from '@components'

export default ({ navigation }) => (
    <SecureScreen navigation={navigation}>
        <VendorModule />
    </SecureScreen>
)