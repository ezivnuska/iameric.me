import React from 'react'
import {
    View,
} from 'react-native'
import {
    ImageList,
    ScreenContent,
    TitleBar,
} from '@components'

export default () => (
    <View>
        <TitleBar title='Images' />
        <ScreenContent>
            <ImageList />
        </ScreenContent>
    </View>
)