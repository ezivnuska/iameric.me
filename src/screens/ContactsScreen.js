import React from 'react'
import {
    Contacts,
    ScreenContent,
    TitleBar,
} from '@components'
import { Screen } from '.'
import { ContactContextProvider } from '@context'

export default props => (
    <Screen {...props}>
        <ContactContextProvider>
            <TitleBar title='Contacts' />
            <ScreenContent>
                <Contacts />
            </ScreenContent>
        </ContactContextProvider>
    </Screen>
)