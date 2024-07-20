import React from 'react'
import {
    Image,
    Pressable,
    View,
} from 'react-native'
import {
    Screen,
    SimpleButton,
} from '@components'
import { useApp } from '@app'
import { useModal } from '@modal'
import { useSocket } from '@socket'
import { signout } from '@utils/auth'
import { cleanStorage } from '@utils/storage'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

export default props => {

    const { reset, theme, user } = useApp()
    const { setModal } = useModal()
    const { notifySocket } = useSocket()

    const source = (user && user.profileImage)
        ? `${IMAGE_PATH}/${user.username}/${user.profileImage.filename}`
        : `${IMAGE_PATH}/avatar-default.png`

    const handleSignout = async id => {
        await signout(id)
        notifySocket('user_signed_out', id)
        cleanStorage()
        reset()
    }
    
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
                    <Pressable
                        onPress={() => setModal('SHOWCASE', user.profileImage)}
                    >
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
                    </Pressable>
                </View>

                <View
                    style={{
                        flexGrow: 0,
                        gap: 10,
                    }}
                >

                    <SimpleButton
                        label={'Sign Out'}
                        onPress={() => handleSignout(user._id)}
                    />
                </View>

            </View>

        </Screen>
    )
}