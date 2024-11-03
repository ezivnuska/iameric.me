import React from 'react'
import { Screen } from './components'
import { Mail } from '@modules'
import { MailContextProvider } from '@mail'

export default props => (
    <Screen secure {...props}>

        <MailContextProvider>
            <Mail />
        </MailContextProvider>

    </Screen>
)