import React from 'react'
import {
    Image,
    Pressable,
    View,
} from 'react-native'
import {
    Screen,
    UserHeader,
} from './components'
import { useApp } from '@app'
import { useModal } from '@modal'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

export default props => {

    const { theme, user } = useApp()
    const { setModal } = useModal()

    const source = (user && user.profileImage)
        ? `${IMAGE_PATH}/${user.username}/${user.profileImage.filename}`
        : `${IMAGE_PATH}/avatar-default.png`
    
    return (
        <Screen {...props}>

            <View
                style={{
                    flex: 1,
                    justifyContent: 'space-between',
                    gap: 10,
                }}
            >

                <UserHeader username={user.username} {...props} />

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

            </View>

        </Screen>
    )
}