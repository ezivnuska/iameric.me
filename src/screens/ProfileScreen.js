import React from 'react'
import {
    Image,
    View,
} from 'react-native'
import {
    Cabinet,
    Heading,
    Screen,
    SimpleButton,
} from '@components'
import { useApp } from '@app'
import { useModal } from '@modal'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

export default props => {

    const { theme, user } = useApp()

    const source = (user && user.profileImage)
        ? `${IMAGE_PATH}/${user.username}/${user.profileImage.filename}`
        : `${IMAGE_PATH}/avatar-default.png`
    
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
                    <Image
                        source={source}
                        style={{
                            width: 100,
                            height: 100,
                            resizeMode: 'cover',
                            borderWidth: 1,
                            borderColor: theme?.colors.textDefault,
                        }}
                    />
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