import React from 'react'
import {
    ScreenContent,
    TitleBar,
    Vendors,
} from '@components'
import {
    Screen,
} from '.'

export default props => (
    <Screen secure={false} {...props}>
        <TitleBar title='Vendors' />
        <ScreenContent>
            <Vendors navigation={props.navigation} />
        </ScreenContent>
    </Screen>
)