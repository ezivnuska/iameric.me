import React from 'react'
import {
    Image,
    Pressable,
    View,
} from 'react-native'
import {
    ThemedText,
} from '@components'
import {
    Screen,
    UserHeader,
} from './components'
import { useApp } from '@app'
import { useModal } from '@modal'
import Icon from 'react-native-vector-icons/Ionicons'

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
                }}
            >

                <UserHeader username={user.username} {...props} />

                <View style={{ flexGrow: 1 }}>
                    <Pressable
                        onPress={() => {
                            if (user && user.profileImage) {
                                setModal('SHOWCASE', user.profileImage)
                            } else {
                                setModal('IMAGE', { avatar: true })
                            }
                        }}
                        style={{
                            position: 'relative',
                            width: 150,
                            height: 150,
                            borderWidth: 1,
                            borderColor: theme?.colors.textDefault,
                        }}
                        // disabled={!user.profileImage}
                    >
                        {!user.profileImage && (
                            <View
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    bottom: 0,
                                    right: 0,
                                    flexDirection: 'row',
                                    alignContent: 'center',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: 'rgba(0, 0, 0, 0.65)',
                                    zIndex: 100,
                                }}
                            >
                                <View
                                    style={{
                                        gap: 15,
                                        paddingTop: 10,
                                    }}
                                >
                                    <Icon
                                        name='add-sharp'
                                        size={75}
                                        color='#fff'
                                        style={{ marginHorizontal: 'auto' }}
                                    />                      
                                    <ThemedText
                                        color='#fff'
                                        size={20}
                                        align='center'
                                        bold
                                    >
                                        Add Avatar
                                    </ThemedText>
                                </View>
                            </View>
                        )}
                        <Image
                            source={source}
                            resizeMode='cover'
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                bottom: 0,
                                right: 0,
                                zIndex: 10,
                            }}
                        />
                    </Pressable>
                </View>

            </View>

        </Screen>
    )
}