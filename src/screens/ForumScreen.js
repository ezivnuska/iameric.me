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
import {
    useModal,
} from '@context'

export default props => {
    const { setModal } = useModal()
    return (
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
}