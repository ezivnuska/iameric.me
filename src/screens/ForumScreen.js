import React from 'react'
import { View } from 'react-native'
import {
    Forum,
    IconButton,
    TitleBar,
    Screen,
} from '@components'
import {
    ForumContextProvider,
    useModal,
} from '@context'
import { classes } from '@styles'

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

            <View style={classes.paddingH}>

                <ForumContextProvider>
                    <Forum />
                </ForumContextProvider>

            </View>

        </Screen>
    )
}