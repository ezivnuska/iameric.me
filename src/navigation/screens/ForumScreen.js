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
        <Screen
            titleComponent={
                <ScreenTitle title='Forum'>
                    <IconButton
                        label='Comment'
                        iconName='add-outline'
                        onPress={() => dispatch({ type: 'SET_MODAL', modalType: 'FEEDBACK' })}
                        alignIcon='right'
                        justify='left'
                        outline
                        style={{ paddingHorizontal: 10, paddingLeft: 10, paddingRight: 10 }}
                        transparent
                    />
                </ScreenTitle>
            }
        >
            <EntryModule />
        </Screen>
    )
}