import React, { useContext } from 'react'
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
                />
            </ScreenTitle>
            <EntryModule />
        </Screen>
    )
}