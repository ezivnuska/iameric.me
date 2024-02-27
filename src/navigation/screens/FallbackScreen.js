import React from 'react'
import { Text } from 'react-native'
import {
    Screen,
    ScreenTitle,
} from '.'
import {
    CenteredView,
} from '@components'

export default ({ route, ...props }) => (
    <Screen
        {...props}
        titleComponent={
            <ScreenTitle title={userDetails ? user.username : 'User' } />
        }
    >
        <CenteredView>
            <Text>404 Error: {route && route.path ? route.path : ''}</Text>
            <Text>Sorry. That page does not exist.</Text>
        </CenteredView>
    </Screen>
)