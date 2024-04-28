import React from 'react'
import {
    ContactModal,
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
            <ContactModal />
        </ContactContextProvider>
    </Screen>
)