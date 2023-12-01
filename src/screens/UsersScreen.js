import React from 'react'
import {
    EntryModule,
    SecureScreen,
    UserModule,
} from '@components'

export default () => (
    <SecureScreen>
        <UserModule />
        <EntryModule />
    </SecureScreen>
)