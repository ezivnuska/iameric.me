import React from 'react'
import { Screen } from '.'
import {
    EntryDisplay,
} from '../components'

const ChatScreen = ({ navigation, ...props }) => (
    <Screen { ...props }>
        <EntryDisplay />
    </Screen>
)

export default ChatScreen