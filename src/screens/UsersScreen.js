import React from 'react'
import {
    Screen,
    ScreenTitle,
    UserModule,
} from '@components'

export default ({ navigation, route, title }) => (
    <Screen navigation={navigation}>
        <ScreenTitle title={title} />
        <UserModule />
    </Screen>
)