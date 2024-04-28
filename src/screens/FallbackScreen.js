import React from 'react'
import {
    Screen,
} from '.'
import {
    CenteredVertical,
    ThemedText,
} from '@components'

export default props => {
    const { route } = props
    return (
        <Screen
            secure={false}
            {...props}
        >
            <CenteredVertical>
                <ThemedText>404 Error: {route && route.path ? route.path : ''}</ThemedText>
                <ThemedText>Sorry. That page does not exist.</ThemedText>
            </CenteredVertical>
        </Screen>
    )
}