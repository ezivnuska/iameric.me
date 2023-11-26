import React from 'react'
import {
    CenteredContent,
    EntryModule,
    SecureScreen,
    UserModule,
} from '@components'

export default ({ navigation, ...props }) => (
    <SecureScreen { ...props}>
        <CenteredContent>
            <UserModule />
            <EntryModule />
        </CenteredContent>
    </SecureScreen>
)