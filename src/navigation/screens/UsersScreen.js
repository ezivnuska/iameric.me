import React from 'react'
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
import { getOrientation } from '@utils/metrics'

export default ({ ...props }) => {
    const dims = useWindowDimensions()
    return (
        <Screen
            landScape={getOrientation(dims) !== 'portrait'}
            titleComponent={<ScreenTitle title='Users' />}
        >
            <UserModule {...props} />
        </Screen>
    )
}