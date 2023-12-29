import React from 'react'
import {
    EntryModule,
    SecureScreen,
} from '../components'

export default ({ navigation }) => (
    <SecureScreen navigation={navigation}>
        <EntryModule />
    </SecureScreen>
)