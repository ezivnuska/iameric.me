import React from 'react'
import {
    ProductModule,
    SecureScreen,
} from '@components'

export default ({ navigation }) => (
    <SecureScreen navigation={navigation}>
        <ProductModule />
    </SecureScreen>
)