import React from 'react'
import {
    View,
} from 'react-native'
import {
    ForumView,
    IconButton,
} from '@components'
import {
    Screen,
    ScreenTitle,
} from '.'
import {
    useModal,
} from '@context'

export default () => {

    const { setModal } = useModal()

    return (
        <Screen
            titleComponent={
                <ScreenTitle title='Forum'>
                    <IconButton
                        label='Comment'
                        iconName='add-outline'
                        onPress={() => setModal('FEEDBACK')}
                        alignIcon='right'
                        justify='left'
                        outline
                        style={{ paddingHorizontal: 10, paddingLeft: 10, paddingRight: 10 }}
                        transparent
                    />
                </ScreenTitle>
            }
        >
            <ForumView />
        </Screen>
    )
}