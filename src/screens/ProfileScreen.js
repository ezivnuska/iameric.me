import React from 'react'
import { View } from 'react-native'
import {
    Cabinet,
    Heading,
    Screen,
    SimpleButton,
} from '@components'
import { useApp } from '@app'
import { useModal } from '@modal'

export default props => {

    const { user } = useApp()
    
    return (
        <Screen
            {...props}
            title={user ? user.username : null}
            profile
        >

            <View
                style={{
                    flexGrow: 1,
                    justifyContent: 'space-between',
                    gap: 20,
                }}
            >
                <View style={{ flexGrow: 1 }}>

                </View>

                <View style={{ flexGrow: 0 }}>
                    <AdvancedSettings />
                </View>

            </View>

        </Screen>
    )
}

const AdvancedSettings = () => {
    const { setModal } = useModal()
    return (
        <Cabinet title='Advanced Settings'>
            <Heading title='Close Account' />
            <SimpleButton
                label='Close Account'
                onPress={() => setModal('DESTROY')}
            />

        </Cabinet>
    )
}