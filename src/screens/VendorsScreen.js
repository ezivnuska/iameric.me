import React from 'react'
import {
    Screen,
    ScreenTitle,
    VendorModule,
} from '@components'

export default ({ navigation }) => (
    <Screen navigation={navigation}>
        <ScreenTitle title='Merchants' />
        <VendorModule />
    </Screen>
)