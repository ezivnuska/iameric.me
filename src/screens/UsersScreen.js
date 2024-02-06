import React from 'react'
import {
    Screen,
    ScreenTitle,
    UserModule,
} from '@components'

export default ({ navigation, route }) => (
    <Screen navigation={navigation}>
        <ScreenTitle title={route.params.title} />
        <UserModule />
    </Screen>
)