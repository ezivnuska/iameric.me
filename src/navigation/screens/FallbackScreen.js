import React from 'react'
import { Text } from 'react-native'
import { Screen } from '.'
import {
    CenteredView,
} from '@components'

export default ({ route, ...props }) => (
    <Screen title={userDetails ? user.username : 'User' } {...props}>
        <CenteredView>
            <Text>404 Error: {route && route.path ? route.path : ''}</Text>
            <Text>Sorry. That page does not exist.</Text>
        </CenteredView>
    </Screen>
)