import React from 'react'
import {
    Forum,
    IconButton,
    ScreenContent,
    TitleBar,
} from '@components'
import {
    Screen,
} from '.'

export default props => (
    <Screen {...props}>
        <TitleBar title='Forum'>
            <IconButton
                label='Comment'
                iconName='add-outline'
                onPress={() => setModal('FEEDBACK')}
                padded={true}
                transparent
            />
        </TitleBar>
        <ScreenContent>
            <Forum />
        </ScreenContent>
    </Screen>
)