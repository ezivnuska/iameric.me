import React from 'react'
import {
    Screen,
} from '.'
import {
    CenteredView,
    ThemedText,
} from '@components'

export default ({ route }) => (
    <Screen>
        <CenteredView>
            <ThemedText>404 Error: {route && route.path ? route.path : ''}</ThemedText>
            <ThemedText>Sorry. That page does not exist.</ThemedText>
        </CenteredView>
    </Screen>
)