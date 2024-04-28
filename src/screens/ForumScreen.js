import React from 'react'
import {
    ForumModal,
    ForumView,
} from '@components'
import {
    Screen,
} from '.'
import {
    ForumContextProvider,
} from '@context'

export default props => (
    <Screen {...props}>
        <ForumContextProvider>
            <ForumView />
            <ForumModal />
        </ForumContextProvider>
    </Screen>
)