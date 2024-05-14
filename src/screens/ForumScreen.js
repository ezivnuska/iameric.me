import React from 'react'
import {
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
        </ForumContextProvider>
    </Screen>
)