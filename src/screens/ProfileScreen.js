import React from 'react'
import {
    Image,
    Pressable,
    View,
} from 'react-native'
import {
    IconButton,
    Screen,
    ThemedText,
} from '@components'
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
        <Screen
            {...props}
            // title={user ? user.username : null}
            // profile
        >

            <View
                style={{
                    flexGrow: 1,
                    justifyContent: 'space-between',
                    gap: 20,
                }}
            >
                <View style={{ flexGrow: 0 }}>

                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            gap: 10,
                            marginBottom: 10,
                        }}
                    >
                        <View style={{ flexGrow: 0 }}>
                            <ThemedText bold size={18}>
                                {user.username}
                            </ThemedText>
                        </View>

                        <View style={{ flexGrow: 1 }}>
                            <IconButton
                                name='images-outline'
                                onPress={() => props.navigation.navigate('Images')}
                                disabled={props.route.name === 'Images'}
                            />
                        </View>
                    </View>
                </View>

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