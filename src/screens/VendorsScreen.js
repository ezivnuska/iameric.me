import React from 'react'
import {
    Vendors,
} from '@components'
import {
    Screen,
} from '.'
import {
    ContactContextProvider,
} from '@context'

export default props => (
    <Screen {...props}>
        <ContactContextProvider>
            <Vendors {...props} />
        </ContactContextProvider>
    </Screen>
)