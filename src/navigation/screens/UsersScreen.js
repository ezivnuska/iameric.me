import React, { useContext } from 'react'
import {
    useWindowDimensions,
} from 'react-native'
import {
    UserModule,
} from '@components'
import {
    Screen,
    ScreenTitle,
} from '.'

export default ({ ...props }) => {
    return (
        <Screen
            titleComponent={<ScreenTitle title='Users' />}
        >
            <UserModule {...props} />
        </Screen>
    )
}