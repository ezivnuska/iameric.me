import React, { useContext } from 'react'
import {
    View,
} from 'react-native'
import {
    EntryModule,
    IconButton,
} from '@components'
import {
    Screen,
    ScreenTitle,
} from '.'
import { AppContext } from '../../AppContext'

export default () => {
    const {
        dispatch,
    } = useContext(AppContext)

    return (
        <Screen>
            <ScreenTitle title='Forum'>
                <IconButton
                    label='Comment'
                    iconName='add-outline'
                    onPress={() => dispatch({ type: 'SET_MODAL', modalName: 'FEEDBACK' })}
                    // align='left'
                    style={{ paddingHorizontal: 10, paddingLeft: 10, paddingRight: 10 }}
                    transparent
                />
            </ScreenTitle>
            <View
                style={{ marginTop: 15 }}
            >
                <EntryModule />
            </View>
        </Screen>
    )
}