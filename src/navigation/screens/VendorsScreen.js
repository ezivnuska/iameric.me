import React from 'react'
import {
    Screen,
    ScreenTitle,
    VendorModule,
} from '@components'

export default props => (
    <Screen>
        <ScreenTitle title='Merchants' />
        <VendorModule {...props} />
    </Screen>
)